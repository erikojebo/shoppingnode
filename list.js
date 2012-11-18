var shoppingListViewModel = {};

var CategoryViewModel = function(id, items) {
    var self = this;
    self.id = id;
    self.items = ko.observableArray(items);
    self.name = ko.computed(function () {
	    return "category" + self.id;
    })
}

$(document).ready(function () {
    $.getJSON('/items', function(data) {

        var itemViewModels = data.map(function (item) {
	        return {
                id: item.id,
                category: ko.observable(item.category),
                isDone: ko.observable(item.done),
                description: ko.observable(item.description),
                toggleIsDone: function () {
	                this.isDone(!this.isDone());
                }
            }
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
        
        shoppingListViewModel = {
            categories: ko.observableArray(categoryViewModels)
        };

        ko.applyBindings(shoppingListViewModel);
    });
})
