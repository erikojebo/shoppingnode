var viewModelFactory = function () {
    function createItemViewModels (items) {
	    return items.map(function (item) {
	        return new ItemViewModel(item);
        });
    };

    function getCategoryIds(items) {
        return _.uniq(items.map(function (item) {
            return item.category;
        })).sort();
    };
    
    function createCategoryViewModel(id, itemViewModels) {
        var items = itemViewModels.filter(function (item) {
	        return item.category() == id;
        });

        return new CategoryViewModel(id, items);
    };

    function createCategoryViewModels(items) {
	    var itemViewModels = createItemViewModels(items);
        var categoryIds = getCategoryIds(items);

        return categoryIds.map(function (id) {
            return createCategoryViewModel(id, itemViewModels);
        });
    };

	function createShoppingListViewModel (items) {
        var categories = createCategoryViewModels(items);
        return new ShoppingListViewModel(categories);
    };

    return {
        createShoppingListViewModel: createShoppingListViewModel
    }
}();

var shoppingListViewModel = {};

var CategoryViewModel = function(id, items) {
    var self = this;
    self.id = id;
    self.items = ko.observableArray(items);
    self.name = ko.computed(function () {
	    return "category" + self.id;
    })
};

var ItemViewModel = function (item) {
    var self = this;
	this.id = item.id;
    this.category = ko.observable(item.category);
    this.isDone = ko.observable(item.done),
    this.description = ko.observable(item.description);
    this.markAsRemaining = function () {
	    server.markAsRemaining(this.id, function () {
	        self.isDone(false);
        });
    };
    this.markAsDone = function () {
	    server.markAsDone(this.id, function () {
	        self.isDone(true);
        });
    };
    this.toggleIsDone = function () {
        if (this.isDone()) {
            this.markAsRemaining();
        } else {
            this.markAsDone();
        }
    };
};

var ShoppingListViewModel = function (categories) {
    var self = this;
    this.isEditing = ko.observable(false);
    this.isLowWidth = ko.observable(false);
    this.categories = ko.observableArray(categories);
    this.clearDone = function () {
        server.clearDone(function () {
	        for(var i = 0; i < self.categories().length; i++) {

                var category = self.categories()[i];
                var doneItems = category.items().filter(function (item) {
	                return item.isDone();
                });
                category.items.removeAll(doneItems);
            }
        });
    };
    this.isEditFormVisible = ko.computed(function () {
        console.log("edit form");
        console.log(!self.isLowWidth() || self.isEditing());
	    return !self.isLowWidth() || self.isEditing();
    });
    this.enterEditMode = function () {
	    self.isEditing(true);
    };
}

var server = function () {
	var clearDone = function (success) {
        $.post('/cleardone')
            .success(success);
    };
    var markAsDone = function (id, success) {
        $.post('/markasdone', { id: id })
            .success(success);
    };
    var markAsRemaining = function (id, success) {
        $.post('/markasremaining', { id: id })
            .success(success);
    };
    var getItems = function (success) {
	    $.getJSON('/items', success);
    };
    return {
        getItems: getItems,
        clearDone: clearDone,
        markAsDone: markAsDone,
        markAsRemaining: markAsRemaining
    };
}();

var environment = function () {
    var isLowWidth = function () {
	    return $(window).width() <= 700;
    };
    return {
        isLowWidth: isLowWidth
    };
}();

$(document).ready(function () {
    server.getItems(function(items) {
        shoppingListViewModel = viewModelFactory.createShoppingListViewModel(items);
        ko.applyBindings(shoppingListViewModel);
        updateViewport();
    });

    $(window).resize(function () {
        updateViewport();
    });
});

function updateViewport() {
    shoppingListViewModel.isLowWidth(environment.isLowWidth());
}
