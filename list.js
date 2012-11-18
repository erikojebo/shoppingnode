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
        shoppingListViewModel = createShoppingListViewModel(data);
        ko.applyBindings(shoppingListViewModel);
    });
});

function createShoppingListViewModel (data) {
	var itemViewModels = data.map(function (item) {
	    return new ItemViewModel(item);
    });

    var categoryIds = _.uniq(itemViewModels.map(function (item) {
        return item.category();
    }));

    var categoryViewModels = categoryIds.sort().map(function (id) {

        var items = itemViewModels.filter(function (item) {
	        return item.category() == id;
        });

        return new CategoryViewModel(id, items);
    })
    
    return {
        categories: ko.observableArray(categoryViewModels)
    };
}
