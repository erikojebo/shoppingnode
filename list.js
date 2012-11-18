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
        return {
            categories: ko.observableArray(categories)
        };
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
	this.id = item.id;
    this.category = ko.observable(item.category);
    this.isDone = ko.observable(item.done),
    this.description = ko.observable(item.description);
    this.toggleIsDone = function () {
	    this.isDone(!this.isDone());
    };
};

$(document).ready(function () {
    $.getJSON('/items', function(data) {
        shoppingListViewModel = viewModelFactory.createShoppingListViewModel(data);
        ko.applyBindings(shoppingListViewModel);
    });
});
