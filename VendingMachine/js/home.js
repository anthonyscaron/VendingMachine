$(document).ready(function () {
    clearItems();
    loadItems();
    selectItem();
});

function clearItems() {
    $('#itemFormRows').empty();
}

function loadItems() {
    clearItems();
    var itemFormRows = $('#itemFormRows');
    
    $.ajax({
        type: 'GET',
        url: 'http://vending.us-east-1.elasticbeanstalk.com/items/',
        success: function (itemsArray) {
            $.each(itemsArray, function (index, item) {
                var id = item.id;
                var name = item.name;
                var price = (item.price).toFixed(2);
                var quantity = item.quantity;

                var itemInfo = '<div class="col-md-4" id="itemBtnDiv"><button type="button" class="btn" id="itemButton" onclick=selectItem(' + id + ')><div id="item">';
                itemInfo += '<div id="itemId">' + id + '</div>';
                itemInfo += '<div id="itemName">' + name + '</div><br />';
                itemInfo += '<div id="itemPrice">$' + price + '</div><br />';
                itemInfo += '<br />';
                itemInfo += '<div id="itemQuantity">Quantity Left: ' + quantity + '</div><br />';
                itemInfo += '</div></button></div>';

                itemFormRows.append(itemInfo);
            })

        },
        error: function () {
            $('#messageBox').val('Out of Order');
        }
    });
}

function addDollar() {
    $('#changeBox').val('');
    $('#messageBox').val('');
    var currentTotal = $('#totalBox').val();

    if (currentTotal == "") {
        currentTotal = 0;
    }

    var newTotal = parseFloat(currentTotal);

    newTotal += 1;
    newTotal = newTotal.toFixed(2);
    $('#totalBox').val(newTotal);
}

function addQuarter() {
    $('#changeBox').val('');
    $('#messageBox').val('');
    var currentTotal = $('#totalBox').val();

    if (currentTotal == "") {
        currentTotal = 0;
    }

    var newTotal = parseFloat(currentTotal);

    newTotal += 0.25;
    newTotal = newTotal.toFixed(2);
    $('#totalBox').val(newTotal);
}

function addDime() {
    $('#changeBox').val('');
    $('#messageBox').val('');
    var currentTotal = $('#totalBox').val();

    if (currentTotal == "") {
        currentTotal = 0;
    }

    var newTotal = parseFloat(currentTotal);

    newTotal += 0.10;
    newTotal = newTotal.toFixed(2);
    $('#totalBox').val(newTotal);
}

function addNickel() {
    $('#changeBox').val('');
    $('#messageBox').val('');
    var currentTotal = $('#totalBox').val();

    if (currentTotal == "") {
        currentTotal = 0;
    }

    var newTotal = parseFloat(currentTotal);

    newTotal += 0.05;
    newTotal = newTotal.toFixed(2);
    $('#totalBox').val(newTotal);
}

function returnChange() {
    var moneyIn = parseFloat($('#totalBox').val());

    var quarters = 0;
    var dimes = 0;
    var nickels = 0;
    var pennies = 0;

    while (moneyIn >= 0.25) {
        moneyIn -= 0.25;
        moneyIn = moneyIn.toFixed(2);
        quarters++;
    }

    while (moneyIn >= 0.10) {
        moneyIn -= 0.10;
        moneyIn = moneyIn.toFixed(2);
        dimes++;
    }

    while (moneyIn >= 0.05) {
        moneyIn -= 0.05;
        moneyIn = moneyIn.toFixed(2);
        nickels++;
    }

    while (moneyIn <= 0.04 && moneyIn > 0) {
        moneyIn -= 0.01;
        moneyIn = moneyIn.toFixed(2);
        pennies++;
    }

    var moneyOut = '';

    if (quarters != 0) {
        if (quarters == 1) {
            moneyOut += quarters + ' quarter';
        }
        else {
            moneyOut += quarters + ' quarters';
        }

        if (dimes != 0 || nickels != 0 || pennies != 0) {
            moneyOut += ', ';
        }
    }

    if (dimes != 0) {
        if (dimes == 1) {
            moneyOut += dimes + ' dime';
        }
        else {
            moneyOut += dimes + ' dimes';
        }

        if (nickels != 0 || pennies != 0) {
            moneyOut += ', ';
        }
    }

    if (nickels != 0) {
        if (nickels == 1) {
            moneyOut += nickels + ' nickel';
        }
        else {
            moneyOut += nickels + ' nickels';
        }

        if (pennies != 0) {
            moneyOut += ', ';
        }
    }

    if (pennies != 0) {
        if (pennies == 1) {
            moneyOut += pennies + ' penny ';
        }
        else {
            moneyOut += pennies + ' pennies ';
        }
    }

    loadItems();
    $('#changeBox').val(moneyOut);
    $('#totalBox').val((0.00).toFixed(2));
    $('#messageBox').val('');
    $('#itemBox').val('');
}

function selectItem(id) {
    $('#itemBox').val(id);
    $('#changeBox').val('');
}

function makePurchase() {
    var item = $('#itemBox').val();

    if (item != "") {
        var amount = $('#totalBox').val();

        if (amount == "") {
            amount = 0;
        }

        amount = parseFloat(amount);


        $.ajax({
            type: 'POST',
            url: 'http://vending.us-east-1.elasticbeanstalk.com/money/' + amount + '/item/' + item,
            success: function (item) {

                var quarters = item.quarters;
                var dimes = item.dimes;
                var nickels = item.nickels;
                var pennies = item.pennies;

                loadItems();
                $('#messageBox').val('Thank You!!!');
                var moneyOut = '';

                if (quarters != 0) {
                    if (quarters == 1) {
                        moneyOut += quarters + ' quarter';
                    }
                    else {
                        moneyOut += quarters + ' quarters';
                    }

                    if (dimes != 0 || nickels != 0 || pennies != 0) {
                        moneyOut += ', ';
                    }
                }

                if (dimes != 0) {
                    if (dimes == 1) {
                        moneyOut += dimes + ' dime';
                    }
                    else {
                        moneyOut += dimes + ' dimes';
                    }

                    if (nickels != 0 || pennies != 0) {
                        moneyOut += ', ';
                    }
                }

                if (nickels != 0) {
                    if (nickels == 1) {
                        moneyOut += nickels + ' nickel';
                    }
                    else {
                        moneyOut += nickels + ' nickels';
                    }

                    if (pennies != 0) {
                        moneyOut += ', ';
                    }
                }

                if (pennies != 0) {
                    if (pennies == 1) {
                        moneyOut += pennies + ' penny ';
                    }
                    else {
                        moneyOut += pennies + ' pennies ';
                    }
                }

                $('#changeBox').val(moneyOut);
                $('#totalBox').val((0.00).toFixed(2));


            },
            error: function (error) {
                loadItems();
                var text = JSON.parse(error.responseText);
                var message = text.message;
                $('#messageBox').val(message);
                $('#changeBox').val('');
            }
        })
    }
    else {
        $('#messageBox').val('Please make a selection');
    }
}

