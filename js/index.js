var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDec = document.getElementById("productDec");
var count = document.getElementById("productCount");
var submitBtn =document.getElementById("submitBtn");

if(JSON.parse(localStorage.getItem("totalProducts")) != null){
    allProducts = JSON.parse(localStorage.getItem("totalProducts")) 

}else{
    var allProducts= [];
}


var mood="Add Product";
var temp;
showData()

//function to be invoked when clicked on the button
function createProduct(){
if(validationForm() == true){
    if(count.value != null){
        for (var i=0 ; i<count.value ; i++){
            product = {
                productName:productName.value,
                productPrice:productPrice.value,
                productCategory:productCategory.value,
                productDec:productDec.value,
            }
            allProducts.push(product)
        }
    }
   
    if (mood == "Add Product"){
        product = {
            productName:productName.value,
            productPrice:productPrice.value,
            productCategory:productCategory.value,
            productDec:productDec.value,
        }
        allProducts.push(product);
        clearInput();
        showData();
        window.scrollBy(0,1200);   
        
    }else if(mood == "Update"){
        allProducts[temp].productName=productName.value;
        allProducts[temp].productPrice=productPrice.value;
        allProducts[temp].productCategory=productCategory.value;
        allProducts[temp].productDec=productDec.value;

        mood="Add Product";
        showData()
        clearInput();
    }
    localStorage.setItem("totalProducts", JSON.stringify(allProducts))

    submitBtn.innerHTML =mood;
    

}else {
    window.alert("Invalid Input")
}
    
}


//function to clear input fields after clicking add product button
function clearInput(){
    productName.value='';
    productPrice.value='';
    productCategory.value='';
    productDec.value='';
    count.value="";

}
// function to write allProduct array at the HTML Dom
function showData(){
    var tableData=''; // empty every time for loop as it wont duplicate at every click

    for(var i =0; i<allProducts.length; i++){
        tableData +=`<tr class="text-center align-middle">
                                <td>${i+1}</td>
                                <td>${allProducts[i].productName}</td>
                                <td>${allProducts[i].productPrice}</td>
                                <td>${allProducts[i].productCategory}</td>
                                <td>${allProducts[i].productDec}</td>
                                <td><button onclick="updateData(${i})" class="btn btn-warning">Update</button></td>
                                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                            </tr>`

    }
    var table = document.getElementById("table"); //table element in the <tbody>
    table.innerHTML = tableData; 
    document.getElementById("counter").innerHTML = `(${allProducts.length})`

}

function updateData(i){
    productName.value= allProducts[i].productName;
    productPrice.value = allProducts[i].productPrice ;
    productCategory.value = allProducts[i].productCategory;
    productDec.value = allProducts[i].productDec;
    mood = "Update"
    submitBtn.innerHTML =mood;
    temp = i;
    window.scrollTo({
        top:0,
        behavior:"smooth"

    })
}

function deleteProduct(i){
    allProducts.splice(i,1);
    showData();
    localStorage.setItem("totalProducts", JSON.stringify(allProducts))

}

function searchData(){
    var search = document.getElementById("search");
    if(search.value != null){
        var character = search.value.toLowerCase();
        var tableData=''; // empty every time for loop as it wont duplicate at every click
        var c =0;
        for(var i=0; i< allProducts.length ; i++ ){
            if(allProducts[i].productName.toLowerCase().includes(character.toLowerCase()) == true){  
                
                    tableData +=`<tr class="text-center align-middle">
                                            <td>${i}</td>
                                            <td>${allProducts[i].productName.toLowerCase().replace(character, `<span class="text-danger fw-bolder">${character}</span>`)}</td>
                                            <td>${allProducts[i].productPrice}</td>
                                            <td>${allProducts[i].productCategory}</td>
                                            <td>${allProducts[i].productDec}</td>
                                            <td><button onclick="updateData(${i})" class="btn btn-warning">Update</button></td>
                                            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                                        </tr>`
                                         c = c+1;
                var table = document.getElementById("table"); //table element in the <tbody>
                table.innerHTML = tableData;
                document.getElementById("counter").innerHTML = `(${c})`

            }
            
        }
        
    }
   
}

function validationForm(){
    var regexProductName = /^[A-Z][a-z]{1,12}/;
    var regexProductPrice =/^([1-9][0-9]{3}|(10000))$/;
    var regexProductCategory = /(tv|laptop|mobile)/i;
    var regexProductDesc = /[\w\s]{5}|[\w\s]{500}\w/;
    if (regexProductName.test(productName.value) == true &
        regexProductPrice.test(productPrice.value) == true &
        regexProductCategory.test(productCategory.value) == true &
        regexProductDesc.test(productDec.value) == true) {
        return true;
    }else{
        return false
    }
    
}