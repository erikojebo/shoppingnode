$(document).ready(function () {
    $.getJSON('/items', function(data) {
        var viewModel = {
            items: data
        };
        ko.applyBindings(viewModel);
    });
})
