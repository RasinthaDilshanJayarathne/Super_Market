const orderItemIdArray = [];

const orderItemArray = [];
const orderPriceArray = [];
const orderArray = [];
const orderIdArray = [];
const orderImageArray = [];

let i = 0;

function orderBasket(itemId,itemName,itemPrice,itemImage){
    orderIdArray.push(i);

    orderItemIdArray.push(itemId);
    orderItemArray.push(itemName);
    orderPriceArray.push(itemPrice);
    orderImageArray.push(itemImage);

    orderArray.push(itemId,itemName,itemPrice,itemImage);

    enableCheckOutButton();

    let orderList = document.getElementById('orderList');

    const orderItemParent = document.createElement('li');

    /*Create the li tag*/
    const orderItem = document.createElement('span');
    orderItem.className = 'd-flex justify-content-between align-items-center';

    /*Create a sapn for red color*/
    const orderItemPriceSpan = document.createElement('span');

    /*Create text node with itemName and itemPrice*/
    const orderItemName = document.createTextNode(' '+ itemName);
    const orderItemPrice = document.createTextNode(' $ ' + itemPrice);

    /*Adjust text color to text-danger*/
    orderItemPriceSpan.className = 'text-danger';

    /*Add price text node into span*/
    orderItemPriceSpan.appendChild(orderItemPrice);

    /*create a delete button*/
    const deleteButton = document.createElement('button');
    const deleteButtonText = document.createTextNode('X');

    deleteButton.setAttribute('onclick','deleteItem('+i+',this)');


    /*append the text to delete button*/
    deleteButton.appendChild(deleteButtonText);

    deleteButton.className = 'btn btn-danger rounded-pill';

   /* /!*Attach the itemName tag and itemPrice to LI tag*!/
    orderItem.appendChild(orderItemName);

    /!*Attach the orderItemPriceSpan SPAN into LI tag*!/
    orderItem.appendChild(orderItemPriceSpan);
*/
    /*Attach or Append the LI tag (child) to parent id=ORDERLIST*/
    orderList.appendChild(orderItem);

    /*IMAGE selection*/
    /*step 1: Add img text*/
    const orderItemImageTag = document.createElement('img');

    /*assign the src itemImage to img*/
    orderItemImageTag.src = itemImage;

    /*className w-25 for image*/
    orderItemImageTag.className = 'w-25 rounded border border-dark';

    const orderItemLeftSiseSpan = document.createElement('span');

    /*appendchild to LI*/
    orderItemLeftSiseSpan.appendChild(orderItemImageTag);

    orderItem.appendChild(orderItemPriceSpan);

    orderItemLeftSiseSpan.appendChild(orderItemName);

    orderItem.appendChild(orderItemLeftSiseSpan);

    orderItem.appendChild(deleteButton);

    orderItemParent.appendChild(orderItem);

    orderList.append(orderItemParent);

    //Button Section
    const decrementButton = document.createElement('button');
    const incrementButton = document.createElement('button');
    const decrementButtonText = document.createTextNode('-');
    const incrementButtonText = document.createTextNode('+');

    decrementButton.setAttribute('onclick','decrementItem('+i+',-1)');
    incrementButton.setAttribute('onclick','incrementItem('+i+',1)');

    const amountItemSpan = document.createElement('span');
    amountItemSpan.className = 'px-3 fw-bold item'+i;
    const amountItemText = document.createTextNode('1');

    decrementButton.className = 'btn-sm btn btn-danger rounded-pill px-3  ms-2 mt-2 fw-bold';
    incrementButton.className = 'btn-sm btn btn-success rounded-pill px-3 mt-2 fw-bold';

    decrementButton.appendChild(decrementButtonText);
    incrementButton.appendChild(incrementButtonText);
    orderItemParent.appendChild(amountItemText);

    orderItemParent.appendChild(incrementButton);
    orderItemParent.appendChild(amountItemSpan);

    orderItemParent.appendChild(decrementButton);

    totalItems();
    costItem();

    /*increment the i = iterary*/
    i++;
};

function deleteItem(orderId, button){

};

function totalItems(){
    document.getElementById('totalItems').innerText = orderItemArray.length;
};

/*function decrementItem(){

}*/

function incrementItem(orderId, val){
    const itemSpan = document.querySelector('.item' + orderId);
    itemSpan.innerText = parseInt(itemSpan.innerText + val);

    if (itemSpan.innerText === 0){
        const indexnum = orderArray.indexOf(orderId);

        // item id
        orderItemArray.splice(indexnum,1);

        orderArray.splice(indexnum,1);
        orderItemArray.splice(indexnum,1);
        orderPriceArray.splice(indexnum,1);

        orderItemArray.push(itemName);
        orderItemArray.push(itemPrice);

        totalItems();
        costItem();

        orderIt.removeChild(itemSpan.parentElement);
        // orderItemParent.removeChild(button.parentElement);

        if(orderPriceArray.length === 0){
            document.getElementById('amount').value = 0;
        }
        enableCheckOutButton();
    }
}

function costItem(){
    if (orderPriceArray.length === 0){
        document.getElementById('totalCost').innerText = 0;
    }else {
        document.getElementById('totalCost').innerText = orderPriceArray.reduce(sumarray).toFixed(2);

        document.getElementById('amount').value =  orderPriceArray.reduce(sumarray).toFixed(2);

        function sumarray(total,sum){
            return total + sum;
        };
    }
};

function orderBasketClear(){
    let orderList = document.getElementById('orderList');
    document.getElementById('amount').value = 0;
    orderList.innerHTML = '';
    orderItemArray.length = 0;
    orderPriceArray.length = 0;
    orderIdArray.length = 0;
    orderArray.length = 0;
    orderArray.length = 0;
    i = 0;
    totalItems();
    costItem();
    enableCheckOutButton();
};

function exactAmountCalculator(){
    document.getElementById('exactAmountSpan').innerText = document.getElementById('amount').value;
};

const calculatorScreenAmount = document.getElementById('calculatorScreenAmount');

function calculatorInsert(number) {

    if (calculatorScreenAmount.value == 0 && number == '00') {
        calculatorScreenAmount.value = '0.';
    } else if (calculatorScreenAmount.value == 0 && number == '0') {
        calculatorScreenAmount.value = '0.';
    } else if (calculatorScreenAmount.value == '' && number == '00') {
        calculatorScreenAmount.value = '0';
    } else if (calculatorScreenAmount.value.includes('.') === true && number == '.') {
        calculatorScreenAmount.value = calculatorScreenAmount.value;
    }else if (calculatorScreenAmount.value == '0' && parseInt(number) > 0){
        calculatorScreenAmount.value = number;
    }else {
        calculatorScreenAmount.value += number;
    }

    if (calculatorScreenAmount.value == '.'){
        calculatorScreenAmount.value = '0.';
    }
    enableConformPaidButton();
};

function exactAmountButton(){
    calculatorScreenAmount.value = document.getElementById('amount').value;
    enableConformPaidButton();
};

function denominationButton(bill){
    calculatorScreenAmount.value = parseFloat(calculatorScreenAmount.value) + bill;
    enableConformPaidButton();
};

function conformPaidButton(){
    const customerAmountPaid = document.getElementById('customerAmountPaid');
    customerAmountPaid.value = calculatorScreenAmount.value;

    const customerAmountChange  = document.getElementById('customerAmountChange');
    customerAmountChange.value = customerAmountPaid.value - document.getElementById('amount').value;

    document.getElementById('calculatorModal').disabled = true;
};

function enableCheckOutButton(){
    const checkOutButton = document.getElementById('checkOutButton');
    checkOutButton.disabled = true;

    if (orderIdArray.length > 0){
        checkOutButton.disabled = false;
    }
    if (orderIdArray.length == 0){

        const backToFoodTab = document.getElementById('food-tab');
        const foodTab = new bootstrap.Tab(backToFoodTab);

        foodTab.show();
    }
}

function goToCheckOutTab(){
    const firstTabEl = document.getElementById('checkOut-tab');
    const firstTab = new bootstrap.Tab(firstTabEl);

    firstTab.show();
}

function calculatorCancel(){
    calculatorScreenAmount.value = '0';
    enableConformPaidButton();
};

function enableConformPaidButton(){
    document.getElementById('conformPaid').disabled = true;


    if (calculatorScreenAmount.value >= parseFloat(document.getElementById('amount').value)){
        document.getElementById('conformPaid').disabled = false;
    }
};
