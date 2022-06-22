// const { data } = require("jquery");

let base_url_api = "https://staging.apricart.pk/api/v1/";
//let base_url_api = "https://cbe.apricart.pk/v1/";
// let base_url_api = "http://192.168.18.14:8080/v1/";

let base_url_web = "http://localhost:3000/";
// let base_url_images = "https://chai.apricart.pk"; //http://15.185.57.143
let base_url_images = base_url_api.slice(0, -1);
let default_image = base_url_web + "assets/imgs/default/MicrosoftTeams-image.png"
// let base_url_cbe = "https://staging.apricart.pk/api/v1/";
let testingPage = ['index1.html', 'index2.html'];



function imgError(image) {
    image.onerror = "";
    console.log(image)
    image.src = default_image;
    return true;
}
function isLoggedIn() {
    let token = getCookie('login_token');
    if(token !== undefined && token.trim() !== ''){
        return true;
    }
    return false;
}
function getHeaders(){
    var _header = {};
    if(isLoggedIn()){
        _header['Authorization'] = 'Bearer '+getCookie('login_token');
    }
    _header['Content-Type'] = "application/json";
    return _header;
}
function getCategoryProducts(params) {
    $.ajax({
            url: base_url_api+ "catalog/categories/products?category="+params+"&page=1&size=20&sortType=&sortDirection=desc&instant=3&city="+getCookie('city_confirm_guest')+"&lang=en&userid=abc123",
            context: document.body
    })
    .done(function(data) {
        if(data.data.length){
            $("#default_products_home")[0].innerHTML  = "";
            data.data.forEach(element => {
                var itemAvailableCheck = checkInCartFromCookie(element.sku);
                if(itemAvailableCheck.length > 0) {
                    $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title.substring(0, 13)+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs. "+element.specialPrice: "Rs. "+element.currentPrice) +"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? "Rs. "+element.currentPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\" ><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])-1)+")\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">"+itemAvailableCheck[0].split('@=')[1]+"</button><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])+1)+")\" class=\"button cart-buttons button-add-to-cart-max\">+</button></div></div></div></div>"
                } else {
                    // $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-right.html\"> <img class=\"default-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-action-1\"> <a aria-label=\"Quick view\" class=\"action-btn hover-up\" data-bs-toggle=\"modal\" data-bs-target=\"#quickViewModal\"><i class=\"fi-rs-eye\"></i></a> <a aria-label=\"Add To Wishlist\" class=\"action-btn hover-up\" href=\"shop-wishlist.html\"><i class=\"fi-rs-heart\"></i></a> <a aria-label=\"Compare\" class=\"action-btn hover-up\" href=\"shop-compare.html\"><i class=\"fi-rs-shuffle\"></i></a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-right.html\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? element.specialPrice: element.currentPrice) +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.currentPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',"+(element.qty +1)+")\" >Add To Cart</button></div></div></div></div></div></div>"
                    $("#default_products_home")[0].innerHTML      += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title.substring(0, 13)+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs. "+element.specialPrice: "Rs. "+element.currentPrice) +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? "Rs. "+element.currentPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',1)\">Add To Cart</button></div></div></div></div></div></div>"
                }


            });
            
        }
        $('html, body').animate({ scrollTop: 500 }, 50);
    });
    return false;
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var allowedViewCartPages = ['/','shop-cart.html','shop-checkout.html','shop-product-full','account.html', 'shop-filter.html', 'groceryorderform.html', 'pharmacyorderform.html', 'page-login-register.html', 'category.html' ];
function UpdateCartByUserCookie(userid) {
    $.ajax({
            url: base_url_api+"guest/cart/all?userid="+userid,
            context: document.body
        })
    .done(function(data) {
        allowedViewCartPages = allowedViewCartPages.concat(testingPage)
        for (let index = 0; index < allowedViewCartPages.length; index++) {
            if(window.location.pathname.indexOf(allowedViewCartPages[index]) > 0){
                updateCart(data)
            }   
        }
    });
}
function UpdateCartByToken(token, type='') {
    let _tempType = '';
    if (type!='') {
     _tempType = '&orderType='+type;
    }
    $.ajax({
        url: base_url_api+"order/cart/all?city="+getCookie('city_confirm_guest')+"&lang=en"+_tempType,
        context: document.body,
        headers: getHeaders()
    })
    .done(function(data) {
        allowedViewCartPages = allowedViewCartPages.concat(testingPage)
        for (let index = 0; index < allowedViewCartPages.length; index++) {
            if(window.location.pathname.indexOf(allowedViewCartPages[index]) > 0){
                updateCart(data, type)
            }   
        }
    });
}
function updateCart(products, type='') {
    $('#header_cart_products')[0].innerHTML = "";
    if(getDeviceSizeCode() <= 2){
        $('.mobile-header-top .mobile-header-logo h5')[0].innerHTML = "My Cart <span>("+products.data.length+" Items)</span>";
        updateDefaultSidebarCart(products);
    }
    products.data.forEach(element => {
        var img = default_image;
        if(element.product.productImageUrl != ""){
            img = base_url_images+element.product.productImageUrl;
        }
        $('#header_cart_products')[0].innerHTML += "<li> <div class=\"shopping-cart-img\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"><img alt=\"Evara\" src=\""+img+"\"></a> </div><div class=\"shopping-cart-title\"> <h4><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.product.title.substring(0, 15)+"."+"</a></h4> <h4><span>"+element.qty+" × </span>"+"Rs. "+element.currentPrice+"</h4> </div><div class=\"shopping-cart-delete\"> <a href=\"#\" onclick=\"return removeMeFromCart('"+element.sku+"', '"+element.qty+"')\" ><i class=\"fi-rs-cross-small\"></i></a> </div></li>"
    });
    $('.shopping-cart-total').find('h4 span')[0].innerHTML = 'Rs. '+  products.message;
    $('.mini-cart-icon').find('span')[0].innerHTML = products.data.length;
    if(location.pathname.indexOf('shop-cart') > 0){
        $('#view_cart_page_products')[0].innerHTML = "";
        products.data.forEach(element => {
            var decrement_string = "";
            if(element.qty>1){
                decrement_string = "onclick=\"addMetoCart(this,'"+element.sku+"', "+(parseInt(element.qty)-1)+")\"";
            }
            $('#view_cart_page_products')[0].innerHTML += "<tr> <td class=\"image product-thumbnail\"><img src=\""+base_url_images+element.product.productImageUrl+"\" alt=\"#\"></td><td class=\"product-des product-name\"> <h5 class=\"product-name\"><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.product.title+"</a></h5> <p class=\"font-xs\">"+element.product.description+"</p></td><td class=\"price\" data-title=\"Price\"><span>"+element.currentPrice+" </span></td><td class=\"text-center\" data-title=\"Qty\"> <div id=\""+element.sku+"_cart\" class=\"detail-qty border radius m-auto\"> <a "+decrement_string+"  class=\"qty-down\"><i class=\"fi-rs-angle-small-down\"></i></a> <span class=\"qty-val\">"+element.qty+"</span> <a onclick=\"addMetoCart(this,'"+element.sku+"', "+(parseInt(element.qty)+1)+")\" class=\"qty-up\"><i class=\"fi-rs-angle-small-up\"></i></a> </div></td><td class=\"text-right\" data-title=\"Cart\"> <span>Rs"+element.currentPrice * element.qty+" </span> </td><td class=\"action\" data-title=\"Remove\"><a href=\"#\" onclick=\"return removeMeFromCart('"+element.sku+"','"+element.qty+"')\" class=\"text-muted\"><i class=\"fi-rs-trash\"></i></a></td></tr>"
        });
        $('#view_cart_page_products')[0].innerHTML += "<tr> <td colspan=\"6\" class=\"text-end\">  </td></tr>";
        $('#cart_subtotal_label_amount')[0].innerHTML = 'Rs. '+  products.message;
        $('#cart_grandtotal_label_amount')[0].innerHTML = 'Rs. '+  products.message;
        
    }
    if(location.pathname.indexOf('shop-checkout') > 0){
        var subtotal = 0;
        var shipping = 0;
        $('#in_cart_checkout')[0].innerHTML = "";
        products.data.forEach(element => {
            $('#in_cart_checkout')[0].innerHTML += 
            `<tr>
                <td class=\"image product-thumbnail\"><img src=\"`+base_url_images+element.product.productImageUrl+`\" alt=\"#\"></td>
                <td>
                    <h5><a href=\"shop-product-full.html?sku=`+element.sku+`\">`+element.product.title+`</a></h5> 
                    <span class=\"product-qty\">x `+element.qty+`</span></td>
                <td>`+element.currentPrice * element.qty+`</td>
            </tr>`;

            subtotal += parseInt(element.currentPrice * element.qty);
        });
        if(type == 'pickup'){
            subtotal = subtotal - products.message + " (3% discount)";
        }
        // <div id=\"checkout_calculator\" >
        $('#in_cart_checkout')[0].innerHTML += `
            <tr class=\"checkout_final_coupon\">
                <th>Coupon</th>
                <td colspan=\"2\"><em>--</em></td>
            </tr>
            <tr class=\"checkout_final_shipping\">
                <th>Shipping</th>
                <td colspan=\"2\"><em>Free Shipping</em></td>
            </tr>
            <tr class=\"checkout_final_subtotal\">
                <th>SubTotal</th>
                <td class=\"product-subtotal\" colspan=\"2\">Rs. `+subtotal  +`</td>
            </tr>
            <tr class=\"checkout_final_gtotal\">
                <th>Total</th>
                <td colspan=\"2\" class=\"product-subtotal\">
                    <span class=\"font-xl text-brand fw-900\">`+"Rs. "+parseInt(subtotal)+`</span>
                </td>
            </tr>
        `;
                                                // </div>

    }
    setCookie('cart_items',products.data.map(function(ele){return ele.sku+'@='+ele.qty},30))
    
}
function addMetoCart(button, sku, qty) {
    var isLoggedin = isLoggedIn();
    var body = {
        cart: [{"sku": sku, "qty": qty}]
    };
    if (!isLoggedin) {
        body['userId'] = getCookie('guestUserId');
    }
    if(qty == 0){
        removeMeFromCart(sku,qty+1);
        return;
    }
    $.ajax({
            url: base_url_api+ (isLoggedin ? "order/cart/save?city="+getCookie('city_confirm_guest')+"&lang=en":"guest/cart/save?city="+getCookie('city_confirm_guest')+"&lang=en"),
            context: document.body,
            type: 'POST',
            dataType: "json",
            processData: false,
            data: JSON.stringify(body),
            headers: getHeaders()
    })
    .done(function(response) {
        updateCart(response);
        var buttonUpdatePages = ['/','shop-product-full','shop-filter.html'];
        buttonUpdatePages = buttonUpdatePages.concat(testingPage)
        for (let index = 0; index < buttonUpdatePages.length; index++) {
            if(location.pathname.indexOf(buttonUpdatePages[index]) > 0){
                updateButton(response, sku);
            }             
        }
        if(location.pathname.indexOf('shop-cart.html') > 0){
            console.log('ásdsad');
        }

    }).fail(function(response) {
        alert(response.responseJSON.message);
    });
        
    return false;
}
// Neighbour to header-action-2 
// <div class="header-action-2"><i class="far fa-heart" aria-hidden="true"><span class="pro-count blue" id="header_wishlist_count">10</span></i></div>
// Neighbour on home products to class="detail-extralink"
// <div class="wishlist-icon"><i onclick="addMetoWatchlist(this,'APRA-OB05-01')" class="far fa-heart" aria-hidden="true"></i></div>
function addMetoWatchlist(button, sku) {
    // <div class=\"wishlist-icon\"><i onclick=\"addMetoWatchlist(this,'"+element.sku+"')\" class=\"far fa-heart\" aria-hidden=\"true\"></i></div>
    var body = {
        "sku":[sku]
    }
    $.ajax({
        url: base_url_api+ "watchlist/save?city="+getCookie('city_confirm_guest')+"&lang=en",
        context: document.body,
        type: 'POST',
        dataType: "json",
        processData: false,
        data: JSON.stringify(body),
        headers: getHeaders()
    })
    .done(function(response) {
        if(response.status == 1){
            $('#header_wishlist_count').innerText = response.data.length;
            $('#add_cart_btns_container'+sku+' .wishlist-icon')[0].children[0].classList.replace('far','fas');
            setCookie('wishlist_items',response.data.map(function(ele){return ele.sku+'@='},30))
        }
    }).fail(function(response) {
        alert(response.responseJSON.message);
    });
}
function getCartFromCookie(){
   
 }
function checkInCartFromCookie(sku) {
    var cookieCart = getCookie('cart_items');
    if(cookieCart!=""){
        var temper = cookieCart.split(',').filter(function (item) {
           return item.includes(sku) 
        })
         return temper;
    }
    return [];
}
function removeMeFromCart(sku,qty) {
    var _isLoggedIn = isLoggedIn();
    var body = {
        cart: [{"sku": sku}]
    };
    if (!_isLoggedIn) {
        body['userId'] = getCookie('guestUserId');
        body['cart'][0]['qty'] = qty;
    }
    $.ajax({
            url: base_url_api + (_isLoggedIn ?"order/cart/delete?city="+getCookie('city_confirm_guest')+"&lang=en":"guest/cart/delete"),
            context: document.body,
            type: 'DELETE',
            dataType: "json",
            processData: false,
            data: JSON.stringify(body),
            headers: getHeaders()
    })
    .done(function(data) {
        updateCart(data);

        var buttonUpdatePages = ['/','shop-product-full','shop-filter.html'];
        buttonUpdatePages = buttonUpdatePages.concat(testingPage)
        for (let index = 0; index < buttonUpdatePages.length; index++) {
            if(location.pathname.indexOf(buttonUpdatePages[index]) > 0){
                updateButton(data, sku);
            }             
        }
    });
        
    return false;
}
function updateButton(response,sku) {
    var _sku = response.data.filter(function(item) {
        return item.sku == sku;
    });
    if(_sku.length == 0){
        $('#add_cart_btns_container_'+sku)[0].innerHTML = "<div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\"add_cart_btn_"+sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+sku+"',1)\">Add To Cart</button></div></div>"
    }else{
        $('#add_cart_btns_container_'+sku)[0].innerHTML = '<button onclick=\"return addMetoCart(this,\''+_sku[0].sku+'\','+(_sku[0].qty-1)+')\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">'+_sku[0].qty+'</button><button onclick=\"return addMetoCart(this,\''+_sku[0].sku+'\','+(_sku[0].qty+1)+')\" class=\"button cart-buttons button-add-to-cart-max\">+</button>'
    }
    // if(_sku.length){
    //     _sku[0].qty
    // }
}
// function addtoWishlist(params) {
//         var body = {
//                 userid: "desktopuser_1641901193762",
//                 sku:["APRA-OB05-01"]
//             }
//         $.ajax({
//                 url:  base_url_api+"/guest/watchlist/save?city="+getCookie('city_confirm_guest')+"&lang=en",
//                 context: document.body,
//                 type: 'POST',
//                 dataType: "json",
//                 processData: false,
//                 data: JSON.stringify(body),
//             })
//             .done(function(data) {
//                 if(data.status == 1){
                    
//                 }
//             }); 
        
//     }
// function login(username, password) {
//     $.ajax({
//         url: "https://staging.apricart.pk/erp/v1/auth/open/login",
//         context: document.body,
//         type: "post",
//         data: '{"guestuserid":"'+getCookie('guestUserId')+'","username":"'+username+'","password":"'+password+'"}',
//     })
//     .done(function(data) {
//         if(data){
//            setCookie('login_token',data.data.token, 30)
//         }
//         // updateCart(data);
//     });
// }
function getCart() {
    if(!isLoggedIn()){
        var userid = getCookie('guestUserId');
        if( userid == ''){
            // Create User
            const d = new Date();
            setCookie('guestUserId', 'desktopuser_'+d.getTime(), 30);
        }else{
           UpdateCartByUserCookie(userid);
        }
    }else{
        delete_cookie('guestUserId');
        delete_cookie('cart_items');
        UpdateCartByToken(getCookie('login_token'));
    }
}

function customerlogin() {
    var user = $('#customer_login_form').find('[name=emaillog]');
    var pass = $('#customer_login_form').find('[name=password]');
    if(user[0].value == '' || pass[0].value == '' ){
        alert('Please include Email/Number and Password')
        return;
    }
    var body = {
        guestuserid : getCookie('guestUserId'),
        username    : user[0].value,
        password    : pass[0].value
    };
    if($('#otp_login')[0].style.display == 'block'){
        body = {
            phoneNumber: user[0].value,
            otp: $('#otp_login').find('[name=otp_login]')[0].value
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: base_url_api+"auth/open/otp/verify",
            data: JSON.stringify(body),
            headers: getHeaders()
        }).done(function(data) {
            if(data.status == 1){
                setCookie('login_token',data.data.token, 30);
                delete_cookie('guestUserId');
                delete_cookie('cart_items');
                window.location.href = base_url_web+"/";
                
                var delayInMilliseconds = 3000; //1 second
                setTimeout(function() {
                }, delayInMilliseconds);
            
            }else if(data.status == 0 ){
                // $('#login_inputs').find('[name=emaillog]')[0].style.border =  "1px solid red";
                // $('#login_inputs').find('[name=password]')[0].style.border =  "1px solid red";
                alert(data.message);
            }
        }).fail(function(data) {
          alert( data.responseJSON.message );
        });
        return false;
    }
    var _header = {};
    _header['Content-Type'] = "application/json";
    $.ajax({
        type: 'POST',
        url: base_url_api+"auth/open/login?city="+getCookie('city_confirm_guest')+"&lang=en",
        data: JSON.stringify(body),
        dataType: 'json',
        headers: getHeaders()
    }).done(function(data) {
        if(data.status == 1){
            delete_cookie('cart_items');
            delete_cookie('guestUserId');
            setCookie('login_token',data.data.token, 30);
            window.location.href = base_url_web+"/";

            // var delayInMilliseconds = 3000; //1 second
            // setTimeout(function() {
            // }, delayInMilliseconds);

        } else if (data.status == 1010){
            $('#login_inputs')[0].style.display = "none";
            $('#otp_login')[0].style.display = "block";
            $('#customer_login_form').find('[name=login]')[0].innerText = "Submit OTP Code";
        }else if(data.status == 0 ){
            $('#login_inputs').find('[name=emaillog]')[0].style.border =  "1px solid red";
            $('#login_inputs').find('[name=password]')[0].style.border =  "1px solid red";
            alert(data.message);
        }
    }).fail(function(data) {
      alert( data.responseJSON.message );
    });
    // $.ajax({
    //     type: "POST",
    //     url: "/webservices/PodcastService.asmx/CreateMarkers",
    //     // The key needs to match your method's input parameter (case-sensitive).
    //     data: JSON.stringify({ Markers: markers }),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function(data){alert(data);},
    //     error: function(errMsg) {
    //         alert(errMsg);
    //     }
    // });

    return false;
}
function showForgot(){
    $('#forgot_form')[0].style.display = 'block';
    $('#login_form')[0].style.display = 'none';
}
function updatePassword(){
    var phoneNum = $('[name=phoneforgot]')[0].value ;
    if(phoneNum.length<11){
        alert('Please enter correct phone number');
        return;
    }
    var body = {
        phoneNumber: $('[name=phoneforgot]')[0].value 
    }
    if($('#newpass_forgot')[0].style.display == 'none'){
        $.ajax({
            url: base_url_api+"auth/open/otp",
            context: document.body,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(body),
            headers:getHeaders()
        }).done(function(data) {
            if(data.status == 1){
                alert(data.message);
                $('#forgot_status')[0].innerText = "Insert OTP* and New Password*";
                $('[name=update_password]')[0].innerText = "Submit";
                $('#newpass_forgot')[0].style.display = "block";
                $('#otp_forgot')[0].style.display = "block";
                $('[name=phoneforgot]').prop('disabled', true);
            }else{
                alert(data.message);
            }
        });
    }else{
        body = {
            "phoneNumber":$('[name=phoneforgot]')[0].value ,
            "password":$('[name=newpass_forgot]')[0].value,
            "otp":$('[name=otp_forgot]')[0].value
        }
        $.ajax({
            url: base_url_api+"auth/open/password/forgot",
            context: document.body,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(body),
            headers:getHeaders()
        }).done(function(data) {
            if(data.status == 1){
                alert(data.message);
                delete_cookie('cart_items');
                delete_cookie('guestUserId');
                setCookie('login_token', data.data.token, 30);
                window.location.href = base_url_web +"/";
            }else{
                alert(data.message);
            }
        });
    }
    
   
}

function logout() {
    document.cookie.split(' ').forEach(function (params) {
        if(params.split('=')[0] != 'city_confirm_guest'){
            delete_cookie(params.split('=')[0]);
        }
    })
    window.location.reload();
}
function registerCustomer() {
    var item = ['username','phone', 'email', 'password', 'c_password'];
    for (let index = 0; index < item.length; index++) {
        if($('#forminput_register').find('[name='+item[index]+']')[0].value == ''){
            alert('Please fill the field '+ $('#forminput_register').find('[name='+item[index]+']')[0].name.toUpperCase());
            $('#forminput_register').find('[name='+item[index]+']')[0].style.border =  "1px solid red";
            return;
        }
        $('#forminput_register').find('[name='+item[index]+']')[0].style.border =  "1px solid #e2e9e1";
    }
    if($('#forminput_register').find('[name=password]')[0].value != $('#forminput_register').find('[name=c_password]')[0].value){
        alert('Password fields are not same');
        $('#forminput_register').find('[name=password]')[0].style.border =  "1px solid red";
        $('#forminput_register').find('[name=c_password]')[0].style.border =  "1px solid red";
        return;
    }
    var body = {
        name    : $('#forminput_register').find('[name=username]')[0].value,
        email : $('#forminput_register').find('[name=email]')[0].value,
        phoneNumber : $('#forminput_register').find('[name=phone]')[0].value,
        password    : $('#forminput_register').find('[name=password]')[0].value,
        guestuserid : getCookie('guestUserId'),
    }
    if(getCookie('guestUserId') == ''){
        alert('Somethings went wrong. Error Code Registration a23fn');
        return;
    }
    if($('#forminput_register').find('[name=otpdiv]')[0].style.display == 'none'){
        $.ajax({
            type: 'POST',
            url: base_url_api +"auth/open/register?city="+getCookie('city_confirm_guest')+"&lang=en",
            context: document.body,
            data: JSON.stringify(body),
            dataType: 'json',
            headers: getHeaders()
        }).done(function(data) {
            if(data.status){
                // Sweet alert required here 
                alert(data.message); 
                $('#hide_registers')[0].style.display = 'none';
                $('#forminput_register').find('[name=otpdiv]')[0].style.display = "block";
                $('#forminput_register').find('[name=login]')[0].innerText = "Submit OTP Code";

                // window.location.href = this.base_url_web+"/"
            }else{
                alert(data.message);
            }
        }).fail(function(data){
            alert(data.responseJSON.message)
        });
    }else{
            body = {
            phoneNumber : $('#forminput_register').find('[name=phone]')[0].value,
            otp: $('#forminput_register').find('[name=otp]')[0].value
        }
        $.ajax({
            url: base_url_api +"auth/open/otp/verify",
            context: document.body,
            type: 'POST',
            data: JSON.stringify(body),
            dataType: 'json',
            headers: getHeaders()
        })
        .done(function(data) {
            if(data.status == 1){
                // Sweet alert required here 
                delete_cookie('cart_items');
                delete_cookie('guestUserId');
                setCookie('login_token', data.data.token, 30);
                alert("User Created Sucessfully.");
                window.location.href = base_url_web +"/";
            } else {
                alert(data.message);
            }
        }).fail(function(data){
            alert(data.responseJSON.message)
        });;
    }
    
    return false;
}
function redirectToLoggedInPages() {
    if(isLoggedIn()) {
        var guestOnlyPages = ['page-login-register.html'];
        for (let index = 0; index < guestOnlyPages.length; index++) {
            if(window.location.pathname.indexOf(guestOnlyPages[index]) > 0){
                window.location.href = base_url_web + '/';
            }
        }
    }else{
        var loggedOnlyPages = ['shop-checkout.html', 'shop-cart.html','account.html','groceryorderform.html', 'pharmacyorderform.html'];
        for (let index = 0; index < loggedOnlyPages.length; index++) {
            if(window.location.pathname.indexOf(loggedOnlyPages[index]) > 0){
                window.location.href = base_url_web + 'page-login-register.html';
            }
        }
    }
}
function redirectToIndex() {
    var locations = ['/frontendbootstrap/'];
    for (let index = 0; index < locations.length; index++) {
        if(window.location.pathname == locations[index]){
            window.location.href = base_url_web + '//';
        }
        
    }
}
function changeFocus() {
    var sizeCode = getDeviceSizeCode();
    var input, dropdown = '';
    // if(sizeCode > 2){
       input =  'home-top-search';
       dropdown = 'top-search-dropdown';
    // }
    // if(sizeCode < 3){
    //     input =  'home-top-search-mobile';
    //     dropdown = 'top-search-dropdown-mobile';
    // }
    if($("#"+dropdown)[0].style.display == 'block'){
        $("#"+dropdown)[0].style.display = 'none';
    }else{
        $("#"+dropdown)[0].style.display  = "block";
    }
    return false;

}
function headerMouseDown(url) {
    console.log(url)
    window.location.href  = url;
}
function getSearchProducts(e){
    var sizeCode = getDeviceSizeCode();
    var input, dropdown = '';
    // if(sizeCode > 2){
       input =  'home-top-search';
       dropdown = 'top-search-dropdown';
    // }
    // if(sizeCode < 3){
    //     input =  'home-top-search-mobile';
    //     dropdown = 'top-search-dropdown-mobile';
    // }
    if($("#"+input ).val().length > 1){
        $.ajax({
            url: base_url_api + "catalog/products/search",
            context: document.body,
            data: 'page=1&size=30&term='+$( "#"+input ).val()+'&category=&city='+getCookie('city_confirm_guest')+'&lang=en'
        }).done(function(data) {
            if(data.data.length){
                    $("#"+dropdown)[0].innerHTML = "";
                    $("#"+dropdown)[0].style.display  = "block";
                    data.data.forEach(element => {
                        var img  = default_image;
                        if(element.productImageUrl != ""){
                            img = base_url_images + element.productImageUrl;
                        }
                        $("#"+dropdown)[0].innerHTML += `
                        <a onmousedown="headerMouseDown('shop-product-full.html?sku=`+element.sku+`')" href="shop-product-full.html?sku=`+element.sku+`">
                            <li class="list-group-item">
                                <span>`+(element.title.length > 28 ? element.title.substr(0,28)+'.' : element.title)+`</span>
                                <span>`+((parseInt(element.specialPrice)== 0)? ('Rs. '+parseInt(element.currentPrice)): ('Rs. '+parseInt(element.specialPrice))) +`</span>
                                <span style="text-decoration: line-through;color: #ca5f5f;">`+((parseInt(element.specialPrice) > 0)?'Rs. '+parseInt(element.currentPrice):'') +`</span>
                            </li>
                        </a>
                        `;
                    
                        //     var itemAvailableCheck = checkInCartFromCookie(element.sku);
                    //     if(itemAvailableCheck.length > 0) {
                    //     // $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-right.html\"> <img class=\"default-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-action-1\"> <a aria-label=\"Quick view\" class=\"action-btn hover-up\" data-bs-toggle=\"modal\" data-bs-target=\"#quickViewModal\"><i class=\"fi-rs-eye\"></i></a> <a aria-label=\"Add To Wishlist\" class=\"action-btn hover-up\" href=\"shop-wishlist.html\"><i class=\"fi-rs-heart\"></i></a> <a aria-label=\"Compare\" class=\"action-btn hover-up\" href=\"shop-compare.html\"><i class=\"fi-rs-shuffle\"></i></a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-right.html\">"+element.title+"</a></h2> <div class=\"rating-result\" title=\"\"> <span> <span></span> </span> </div><div class=\"product-price\"> <span>"+  element.currentPrice +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.specialPrice: "")+"</span> </div><div class=\"product-action-1 show\"> <a aria-label=\"Add To Cart\" class=\"action-btn hover-up\" href=\"shop-cart.html\"><i class=\"fi-rs-shopping-bag-add\"></i></a> </div></div></div></div>"
                    //         $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  element.currentPrice +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.specialPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])-1)+")\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">"+itemAvailableCheck[0].split('@=')[1]+"</button><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])+1)+")\" class=\"button cart-buttons button-add-to-cart-max\">+</button></div></div></div></div>"
                    //     }else{
                    //         $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  element.currentPrice +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.specialPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',1)\">Add To Cart</button></div></div></div></div></div></div>"
                    //     }
                    });
            }
    
                // $('html, body').animate({ scrollTop: 500 }, 50);
        });
    }else{
        $("#"+dropdown)[0].innerHTML = "";
        $("#"+dropdown)[0].style.display  = "none";
    }
    return false;
}

function headerProductSearchEnter(){
    $("#home-top-search, #home-top-search-mobile").on('keyup', function (e) { 
        if (e.key === 'Enter' || e.keyCode === 13) {
            window.location.href = base_url_web + "shop-filter.html?term="+(($('#home-top-search')[0].value== '')? $('#home-top-search-mobile')[0].value:$('#home-top-search')[0].value) +"&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city="+getCookie('city_confirm_guest')+"&lang=en";
        }
        return false;
    });
}
function goSearch(){
    if($('#home-top-search')[0].value == ''){
        alert('Please insert a product');
        return;
    }
    // console.log('goSearch')
    window.location.href = base_url_web + "shop-filter.html?term="+$('#home-top-search')[0].value+"&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city="+getCookie('city_confirm_guest')+"&lang=en"
    // return false;
}
function cancelme(orderId){
    $.ajax({
        url: base_url_api+"order/checkout/cancel?id="+orderId,
        context: document.body,
        headers:getHeaders()
    }).done(function(data) {
        if(data.status == 1){
            alert(data.message);
            window.location.reload();
        }
    }).fail(function(data) {
        alert( data.responseJSON.message );
        // console.log(data.responseJSON.message);
      });;

}

function reOrderme(orderId){
    $.ajax({
        url: base_url_api+"order/add/from/history?id="+orderId,
        context: document.body,
        headers:getHeaders()
    }).done(function(data) {
        console.log(data);
        if(data.status == 1){
            alert("Products Added to Cart");
            UpdateCartByToken(getCookie('login_token'))
        }
    }).fail(function(data) {
        alert( data.responseJSON.message );
        // console.log(data.responseJSON.message);
      });;

}
function sidebarToggle() {
    var navbarTrigger = $('header .header-action-right .header-action-icon-2.sidebar_toggle'),
            // endTrigger = $('.mobile-menu-close'),
            container = $('.mobile-header-active'),
            wrapper4 = $('body');
        
    wrapper4.prepend('<div class="body-overlay-1"></div>');
    
    navbarTrigger.on('click', function(e) {
        e.preventDefault();
        container.addClass('sidebar-visible');
        wrapper4.addClass('mobile-menu-active');
    });
}
function updateTicker(){
    // Load Ticker
    $.ajax({
        url: base_url_api + "options/all",
        context: document.body
    }).done(function(data) {
        if(data.data.length){
            if($("#news-flash-ul")[0] != undefined){
               var header_ticker =  data.data.filter(function(x){
                    return x.key == 'ticker';
                })
                if(header_ticker.length){
                    $("#news-flash-ul")[0].innerHTML = "";
                    $("#news-flash-ul")[0].innerHTML  += header_ticker[0]['value'];
                }
                console.log();
                // data.forEach(element => {
                // });
            }
        }
    });
}
function updateAddress(id,name,address, phoneNumber, email, areaId) {
    var body = {
        "id": id,
        "name":name,
        "address":address,
        "phoneNumber":phoneNumber,
        "email":email,
        "areaId": areaId,
        "mapLat":"24.881308",
        "mapLong":"67.06022"
    };
    $.ajax({
        url: base_url_api+ "home/address/delivery/update",
        context: document.body,
        type: 'POST',
        dataType: "json",
        processData: false,
        data: JSON.stringify(body),
        headers: getHeaders()
    })
    .done(function(response) {
        if(response.status == 1){
            alert(response.message);
            window.location.reload();
        }
    });
}
function addAddress(name,address, phoneNumber, email, areaId) {
    var body = {
        "name":name,
        "phoneNumber":phoneNumber,
        "email":email,  
        "mapLat":"24.881308",
        "mapLong":"67.06022",
        "address":address,
        "googleAddress": '',
        "areaId": areaId,
    };
    $.ajax({
        url: base_url_api+ "home/address/delivery/save",
        context: document.body,
        type: 'POST',
        dataType: "json",
        processData: false,
        data: JSON.stringify(body),
        headers: getHeaders()
    })
    .done(function(response) {
        if(response.status == 1){
            alert(response.message);
            window.location.reload();
        }
    });
}
function deleteAddress(addressId) {
    var body = {
        "id": addressId
    };
    $.ajax({
        url: base_url_api+ "home/address/delivery/delete",
        context: document.body,
        type: 'DELETE',
        dataType: "json",
        processData: false,
        data: JSON.stringify(body),
        headers: getHeaders()
    })
    .done(function(response) {
        if(response.status){
            alert(response.message);
            window.location.reload();
        }
    });

}
function updateCity(){
    console.log('asdsad');
    if($('#city_confirm_modal input:checked')[0]!=undefined){
        var city_name = $('#city_confirm_modal input:checked').attr('data-name');  
        console.log(city_name.toLowerCase());
        setCookie('city_confirm_guest', city_name.toLowerCase(),30);
        if($('#location_click')[0]){
            $('#location_click')[0].innerText = capitalizeFirstLetter(city_name);
        }
        // if($('#location_click_mobile')[0]){
        //     $('#location_click_mobile')[0].innerText = capitalizeFirstLetter(city_name);
        // }
        window.location.reload();
    }
}
function getCity() {
    // var myModal = document.getElementById('staticBackdrop');
    // myModal.addEventListener('hide.bs.modal', function () {
    //     if($('#city_confirm_modal input:checked')[0]!=undefined){
    //         var city_name = $('#city_confirm_modal input:checked')[0].name;  
    //         setCookie('city_confirm_guest', city_name.toLowerCase(),30);
    //         $('#location_click')[0].innerText = capitalizeFirstLetter(city_name);
    //         window.location.reload();
    //     }
    // });
    $.ajax({
        url: base_url_api+"home/address/cities?lang=en",
        context: document.body
      })
    .done(function(data) {
        if(data.status == 1){
            if($('#city_confirm_modal')[0] != undefined){
                data.data.forEach(element => {
                    $('#city_confirm_modal')[0].innerHTML += 
                        `<div class="form-check">
                            <input class="form-check-input" type="radio" data-name="`+element.city.toLowerCase()+`" name="cities" id="flexRadioDefault`+element.id+`">
                            <label class="form-check-label" for="flexRadioDefault`+element.id+`">
                                `+element.city+`
                            </label>
                        </div>`;
                });
            }
            if(getCookie('city_confirm_guest') == ''){
                $('#location_click')[0].click();
            }else{ 
                var saved_city = getCookie('city_confirm_guest');
                var _city = data.data.filter(function(x){
                    return x.city.toLowerCase() == saved_city;
                });
                if($('#location_click')[0]){
                    $('#location_click')[0].innerText = _city[0].city;
                }
            }
            registerEvents();
        }
    });
}

function initHeader(){
    var pages = ['page-login-register', 'shop-product-full', 'shop-cart', 'shop-checkout', '/','shop-filter','account.html','groceryorderform.html','pharmacyorderform.html', 'page-contact.html','page-about.html', 'category.html'];
    pages = pages.concat(testingPage)
    var _isloggedin = isLoggedIn();
    for (let index = 0; index < pages.length; index++) {
        if(window.location.pathname.indexOf(pages[index]) > 0){
            if($('#location_click')[0] != undefined){
                $('#location_click')[0].innerText = capitalizeFirstLetter(getCookie('city_confirm_guest'));
            }
            if( getDeviceSizeCode() < 3){
                $('ul.container.cart-items-sidebar-mobile').height(window.innerHeight - $('.container.sidebar_totals.mt-20').height() + $('.mobile-header-top').height() - 170);
            }
            sidebarToggle();
            updateTicker();
            getCity();
            headerProductSearchEnter();
            // updateDefaultSidebarCart();
            updateDefaultSidebar();
            // Init Commands
            // getCityWiseProducts(getCookie('city_confirm_guest') == ""?'':getCookie('city_confirm_guest'));
            if(_isloggedin){
                if($('#header_accounts')[0] != undefined){
                    $('#header_accounts')[0].href = 'account.html';
                    // $('#mobile_login')[0].href = 'account.html';
                    $.ajax({
                        url: base_url_api+"home/profile",
                        context: document.body,
                        headers:getHeaders()
                    }).done(function(res) {
                        if(res.status == 1){
                            $('#header_accounts')[0].innerText = 'Welcome '+res.data.name;
                            // $('#mobile_login')[0].innerText = 'Welcome '+res.data.name;
                            var updateProfile = ['shop-checkout.html'];
                            for (let index = 0; index < updateProfile.length; index++) {
                                if(window.location.pathname.indexOf(updateProfile[index]) > 0){
                                    $('#address_billing input[name="name"]')[0].value = res.data.name;
                                    $('#address_billing input[name="phoneNumber"]')[0].value = res.data.phoneNumber;
                                    $('#address_billing input[name="email"]')[0].value = res.data.email;
                                    // $('#address_billing input[name="address"]')[0].value = res.data.address;
                                }
                                
                            }
                        }
                    });
                }
            }
        }
        
    }
}

// var searchInputId, searchInputDropdown = '';
// if(getDeviceSizeCode() > 2){
//     searchinputId = 'home-top-search';
//     searchInputDropdown = 'top-search-dropdown';
// }
// if(getDeviceSizeCode() < 3){
//     searchinputId = 'home-top-search-mobile';
//     searchInputDropdown = 'top-search-dropdown-mobile';
// }

// $("#"+searchinputId).change(function(){
//     console.log('change')
//     console.log(this.value)
//     if(this.value == ''){
//         $("#"+searchInputDropdown)[0].style.display = 'none';
//     }else{
//         getSearchProducts(this)
//     }
//   });
// $('#'+searchinputId).blur( function() {
//     if($("#"+searchInputDropdown)[0].style.display == 'block'){
//         $("#"+searchInputDropdown)[0].style.display = 'none';
//     }
// });
// $('#'+searchinputId).focus( function() {
//     if($("#"+searchInputDropdown)[0].style.display == 'none'){
//         $("#"+searchInputDropdown)[0].style.display = 'block';
//     }
// });
// function getCityWiseProducts(city='karachi') {
//     // Default Products
//     $("#default_products_home")[0].innerHTML  = "";
//     var home_prod_url =base_url_api + "catalog/categories/products?category=1157&page=1&size=12&sortType=&sortDirection=asc&instant=3&city="+ city;
//     $.ajax({
//         url: home_prod_url,
//         context: document.body
//     })
//     .done(function(response) {
//         if(response.status == 1){
//             response.data.forEach(element => {
//                 var img = default_image;
//                 if(element.productImageUrl != ""){
//                     img = base_url_images+element.productImageUrl;
//                 }
//                 if(element.inStock){
//                     var itemAvailableCheck = checkInCartFromCookie(element.sku);
//                     if(itemAvailableCheck.length > 0) {
//                         $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-2 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" referrerpolicy=\"unsafe-url\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title.substring(0,42)+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs."+element.specialPrice: "Rs."+element.currentPrice) +"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ?"Rs"+ element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(itemAvailableCheck[0].split('@=')[1]-1)+")\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">"+itemAvailableCheck[0].split('@=')[1]+"</button><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])+1)+")\" class=\"button cart-buttons button-add-to-cart-max\">+</button></div></div></div>"
//                     } else {
//                         $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-2 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" referrerpolicy=\"unsafe-url\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title.substring(0,42)+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs."+element.specialPrice: "Rs."+element.currentPrice) +"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? "Rs"+element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',"+(element.qty +1)+")\" >Add To Cart</button></div></div></div></div></div></div>"
//                     }
//                     // $('#add_cart_btn_'+sku)[0].innerHTML = "<button onclick=\"return addMetoCart(this,\''+_sku[0].sku+'\','+(_sku[0].qty-1)+')\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">'+_sku[0].qty+'</button><button onclick=\"return addMetoCart(this,\''+_sku[0].sku+'\','+(_sku[0].qty+1)+')\" class=\"button cart-buttons button-add-to-cart-max\">+</button>"
//                 }else{
//                     $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-2 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" referrerpolicy=\"unsafe-url\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs."+element.specialPrice: "Rs."+element.currentPrice) +"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? "Rs"+element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart outstock\" >Out of Stock</button></div></div></div></div></div></div>"
//                 }
//             });
//         }
//     });
 
// function getSearchProducts(e){
    
//     console.log($( "#home-top-search" ).val());
//     var sizeCode = getDeviceSizeCode();
//     var input, dropdown = '';
//     if(sizeCode > 2){
//        input =  'home-top-search';
//        dropdown = 'top-search-dropdown';
//     }
//     if(sizeCode < 3){
//         input =  'home-top-search-mobile';
//         dropdown = 'top-search-dropdown-mobile';
//     }
//     console.log(input);
//     if($("#"+input ).val().length > 2){
//         $.ajax({
//             url: base_url_api + "catalog/products/search",
//             context: document.body,
//             data: 'page=1&size=5&term='+$( "#"+input ).val()+'&category=&city='+getCookie('city_confirm_guest')+'&lang=en'
//         }).done(function(data) {
//             if(data.data.length){
//                     $("#"+dropdown)[0].innerHTML = "";
//                     $("#"+dropdown)[0].style.display  = "block";
//                     data.data.forEach(element => {
//                         var img  = default_image;
//                         if(element.productImageUrl != ""){
//                             img = base_url_images + element.productImageUrl;
//                         }
//                         $("#"+dropdown)[0].innerHTML += `
//                         <a href="shop-product-full.html?sku=`+element.sku+`">
//                             <li class="list-group-item"><img src="`+img+`">
//                                 <span>`+(element.title.length > 29 ? element.title.substr(0,29)+'...' : element.title)+`</span>
//                                 <span>`+((parseInt(element.specialPrice)== 0)? ('Rs.'+parseInt(element.currentPrice)): ('Rs.'+parseInt(element.specialPrice))) +`</span>
//                                 <span style="text-decoration: line-through;color: #ca5f5f;">`+((parseInt(element.specialPrice) > 0)?'Rs.'+parseInt(element.currentPrice):'') +`</span>
//                             </li>
//                         </a>
//                         `;
                    
//                         //     var itemAvailableCheck = checkInCartFromCookie(element.sku);
//                     //     if(itemAvailableCheck.length > 0) {
//                     //     // $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-right.html\"> <img class=\"default-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-action-1\"> <a aria-label=\"Quick view\" class=\"action-btn hover-up\" data-bs-toggle=\"modal\" data-bs-target=\"#quickViewModal\"><i class=\"fi-rs-eye\"></i></a> <a aria-label=\"Add To Wishlist\" class=\"action-btn hover-up\" href=\"shop-wishlist.html\"><i class=\"fi-rs-heart\"></i></a> <a aria-label=\"Compare\" class=\"action-btn hover-up\" href=\"shop-compare.html\"><i class=\"fi-rs-shuffle\"></i></a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-right.html\">"+element.title+"</a></h2> <div class=\"rating-result\" title=\"\"> <span> <span></span> </span> </div><div class=\"product-price\"> <span>"+  element.currentPrice +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.specialPrice: "")+"</span> </div><div class=\"product-action-1 show\"> <a aria-label=\"Add To Cart\" class=\"action-btn hover-up\" href=\"shop-cart.html\"><i class=\"fi-rs-shopping-bag-add\"></i></a> </div></div></div></div>"
//                     //         $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  element.currentPrice +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.specialPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])-1)+")\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">"+itemAvailableCheck[0].split('@=')[1]+"</button><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])+1)+")\" class=\"button cart-buttons button-add-to-cart-max\">+</button></div></div></div></div>"
//                     //     }else{
//                     //         $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+base_url_images+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  element.currentPrice +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.specialPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',1)\">Add To Cart</button></div></div></div></div></div></div>"
//                     //     }
//                     });
//             }
    
//                 // $('html, body').animate({ scrollTop: 500 }, 50);
//         });
//     }else{
//         $("#"+dropdown)[0].innerHTML = "";
//         $("#"+dropdown)[0].style.display  = "none";
//     }
//     return false;
// }

// function headerProductSearchEnter(){
//     $("#home-top-search").on('keyup', function (e) {
//         if (e.key === 'Enter' || e.keyCode === 13) {
//             window.location.href = base_url_web + "shop-filter.html?term="+$('#home-top-search')[0].value+"&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city="+getCookie('city_confirm_guest')+"&lang=en";
//         }
//         return false;
//     });
// }
// function goSearch(){
//     if($('#home-top-search')[0].value == ''){
//         alert('Please insert a product');
//         return;
//     }
//     window.location.href = base_url_web + "shop-filter.html?term="+$('#home-top-search')[0].value+"&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city="+getCookie('city_confirm_guest')+"&lang=en"
// }

//     $.ajax({
//         url: base_url_api+"home/all?client_lat=24.881308&client_long=67.06022&city="+city.toLocaleLowerCase(),
//         context: document.body
//       })
//     .done(function(data) {
//         if(data.data.products.length){

//             $('#carausel-4-columns').slick('unslick');
//             $('#carausel-6-columns-2').slick('unslick');
//             $('#home_front_banners').slick('unslick');
//             $('#carausel-6-columns').slick('unslick');
            
        

//         // Recommended Products
//             // $("#carausel-4-columns")[0].innerHTML  = "";
//             // data.data.products[0].data.forEach(element => {
//             //     var img = default_image;
//             //     if(element.productImageUrl != ""){
//             //         img = base_url_images+element.productImageUrl;
//             //     }
//             //     if(element.inStock){
//             //         var itemAvailableCheck = checkInCartFromCookie(element.sku);
//             //         if(itemAvailableCheck.length > 0) {
//             //             $("#carausel-4-columns")[0].innerHTML  += "<div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? element.specialPrice: element.currentPrice) +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(itemAvailableCheck[0].split('@=')[1]-1)+")\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">"+itemAvailableCheck[0].split('@=')[1]+"</button><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])+1)+")\" class=\"button cart-buttons button-add-to-cart-max\">+</button></div></div>"
//             //         } else {
//             //             $("#carausel-4-columns")[0].innerHTML  += "<div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? element.specialPrice: element.currentPrice) +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',"+(element.qty +1)+")\" >Add To Cart</button></div></div></div></div></div>"
//             //         }
//             //     }else{
//             //         $("#carausel-4-columns")[0].innerHTML  +=                                                       "<div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? element.specialPrice: element.currentPrice) +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart outstock\" >Out of Stock</button></div></div></div></div></div>"                       
//             //     }
//             // });
//             // var appendArrowsClassName = '#carausel-4-columns'+'-arrows';
//             // $('#carausel-4-columns').slick({
//             //     dots: false,
//             //     infinite: true,
//             //     speed: 1000,
//             //     arrows: true,
//             //     autoplay: true,
//             //     slidesToShow: 5,
//             //     slidesToScroll: 1,
//             //     loop: true,
//             //     adaptiveHeight: true,
//             //     responsive: [
//             //         {
//             //             breakpoint: 1025,
//             //             settings: {
//             //                 slidesToShow: 3,
//             //                 slidesToScroll: 3,
//             //             }
//             //         },
//             //         {
//             //             breakpoint: 480,
//             //             settings: {
//             //                 slidesToShow: 1,
//             //                 slidesToScroll: 1
//             //             }
//             //         }
//             //     ],
//             //     prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
//             //     nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
//             //     appendArrows:  (appendArrowsClassName),
//             // });
        
//             // Most Sold
//             var id_attr = 0;
//             data.data.products.forEach(parent => {
//                 if(parent.name.indexOf('Manual') == -1){
//                     id_attr++;
//                     $('#all_carousels')[0].innerHTML += `
//                         <section class="section-padding">
//                             <div class="container wow fadeIn animated">
//                                 <h3 class="section-title mb-10">`+parent.name+`</h3>
//                                 <section class="banner-2 section-padding pb-0">
//                                     <div class="container">
//                                         <div class="banner-img banner-big wow fadeIn animated f-none">
//                                             <img src="`+ base_url_images + parent.bannerImage +`" style="width: -webkit-fill-available;" alt="">
//                                         </div>
//                                     </div>
//                                 </section>
//                                 <div class="carausel-6-columns-cover position-relative">
//                                     <div class="slider-arrow slider-arrow-2 carausel-6-columns-arrow" id="carausel-6-columns-2-arrows_`+id_attr+`"></div>
//                                     <div class="carausel-6-columns carausel-arrow-center" id="carausel-6-columns-2_`+id_attr+`">
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>
//                     `;
//                     parent.data.forEach(element => {
//                         var img = default_image;
//                         if(element.productImageUrl != ""){
//                             img = base_url_images+element.productImageUrl;
//                         }
//                         var title = element.title.substring(0,42);

//                         if(element.inStock){
//                             var itemAvailableCheck = checkInCartFromCookie(element.sku);
//                             if(itemAvailableCheck.length > 0) {
//                                 $("#carausel-6-columns-2_"+id_attr)[0].innerHTML  += "<div class=\"product-cart-wrap small hover-up\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs"+element.specialPrice: "Rs"+element.currentPrice) +"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? "Rs"+element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(itemAvailableCheck[0].split('@=')[1]-1)+")\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">"+itemAvailableCheck[0].split('@=')[1]+"</button><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])+1)+")\" class=\"button cart-buttons button-add-to-cart-max\">+</button></div></div>"
//                             } else {
//                                 $("#carausel-6-columns-2_"+id_attr)[0].innerHTML  += "<div class=\"product-cart-wrap small hover-up\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs"+element.specialPrice: "Rs"+element.currentPrice) +"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? "Rs"+element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',"+(element.qty +1)+")\" >Add To Cart</button></div></div></div></div></div>"
//                             }
//                         }else{
//                             $("#carausel-6-columns-2_"+id_attr)[0].innerHTML  += "<div class=\"product-cart-wrap small hover-up\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"> <img class=\"default-img\" src=\""+img+"\" alt=\"\"> <img class=\"hover-img\" src=\""+img+"\" alt=\"\"> </a> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-full.html\"></a> </div><h2><a href=\"shop-product-full.html?sku="+element.sku+"\">"+title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? "Rs"+element.specialPrice: "Rs"+element.currentPrice) +"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? "Rs"+element.currentPrice: "")+"</span> </div><div class=\"button-container\" id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart outstock\" >Out of Stock</button></div></div></div></div></div>"
//                         }
//                     });
//                 }
//             });
//             id_attr = 0;
//             data.data.products.forEach(parent => {
//                 id_attr++;
//                 var appendArrowsClassName = '#carausel-6-columns-2-arrows_'+id_attr;
//                     $('#carausel-6-columns-2_'+id_attr).slick({
//                     dots: false,
//                     infinite: true,
//                     speed: 1000,
//                     arrows: true,
//                     autoplay: true,
//                     slidesToShow: 5,
//                     slidesToScroll: 3,
//                     loop: true,
//                     adaptiveHeight: true,
//                     responsive: [
//                         {
//                             breakpoint: 1025,
//                             settings: {
//                                 slidesToShow: 3,
//                                 slidesToScroll: 3,
//                             }
//                         },
//                         {
//                             breakpoint: 480,
//                             settings: {
//                                 slidesToShow: 1,
//                                 slidesToScroll: 1
//                             }
//                         }
//                     ],
//                     prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
//                     nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
//                     appendArrows:  (appendArrowsClassName),
//                 });
//             });

//             // $("#carausel-6-columns-2")[0].innerHTML  = "";
            
//         }
//         // Categories Sidebar
//         if(data.data.categories.length){
//             if(getDeviceSizeCode() > 3){
//                 $("#sidebar_categories")[0].innerHTML  = "";
//                 data.data.categories.forEach(element => {
//                     $("#sidebar_categories")[0].innerHTML +=  
//                     `<li class="nav-item">
//                         <a class="nav-link" href="shop-filter.html?category=`+element.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en" > `+element.name+` `+((element.childrenData.length > 0)? `<b class="float-end">&raquo;</b>`:``) +` </a>
//                         `+getChilds2(element)+`
//                     </li>`
//                 });
//             }
            
//             $("#"+categories_dropdown)[0].innerHTML  = "";
//             if($("#"+categories_dropdown)[0]){
//                 data.data.categories.forEach(element => {
//                     $("#"+categories_dropdown)[0].innerHTML +=  
//                     `<li><a href="shop-filter.html?category=`+element.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en"><i class="evara-font-desktop"></i>`+element.name+`</a></li>`;
//                 });
//             }
//             // Categories Slick Slider
//             data.data.categories.forEach(element => {

//                 var img = default_image;
//                 if(element.image != "" ){
//                     img = base_url_images+element.image;
//                 }
//                 $("#carausel-6-columns")[0].innerHTML +=  
//                 `<div class="card-1">
//                         <figure class=" img-hover-scale overflow-hidden">
//                             <a href="shop-filter.html?category=`+element.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en" ><img src="`+img+`" alt=""></a>
//                         </figure>
//                         <h5><a href="shop-filter.html?category=`+element.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en" >`+element.name+`</a></h5>
//                 </div>`
//             });
//             var appendArrowsClassName = '#carausel-6-columns'+'-arrows';
//             $('#carausel-6-columns').slick({
//                 dots: false,
//                 infinite: true,
//                 speed: 1000,
//                 arrows: true,
//                 autoplay: true,
//                 slidesToShow: 6,
//                 slidesToScroll: 3,
//                 loop: true,
//                 adaptiveHeight: true,
//                 responsive: [
//                     {
//                         breakpoint: 1025,
//                         settings: {
//                             slidesToShow: 4,
//                             slidesToScroll: 1,
//                         }
//                     },
//                     {
//                         breakpoint: 768,
//                         settings: {
//                             slidesToShow: 3,
//                             slidesToScroll: 1,
//                         }
//                     },
//                     {
//                         breakpoint: 480,
//                         settings: {
//                             slidesToShow: 1,
//                             slidesToScroll: 1
//                         }
//                     }
//                 ],
//                 prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
//                 nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
//                 appendArrows:  (appendArrowsClassName),
//             });

//         }
        
//         if(data.data.banners.length){

//             data.data.banners.forEach(element => {
//                 $('#home_front_banners')[0].innerHTML +=
//                 `<div class="single-hero-slider single-animation-wrap">
//                     <div class="container">
//                         <div class="slider-1-height-2 slider-animated-1">
//                             <div class="single-slider-img single-slider-img-1">
//                                 <img class="animated" src="`+base_url_images + element.bannerUrlWeb[0]+`" alt="">
//                             </div>
//                         </div>
//                     </div>
//                 </div>`;
//             });

//             $('#home_front_banners').slick({
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 fade: true,
//                 loop: true,
//                 speed: 1000,
//                 dots: true,
//                 arrows: true,
//                 prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
//                 nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
//                 appendArrows: '.hero-slider-1-arrow',
//                 autoplay: true,
//             });
//         }
//     });
// }
function registerEvents(){
    $('#city_confirm_modal input[type="radio"]').on('click', function(e) {
        console.log(e);
    });
}
function startLoad(){
    $('#preloader-active')[0].style.display = 'block';
}
function stopLoad(){
    $('#preloader-active')[0].style.display = 'none';
}
function toggleLoad(){
    if($('#preloader-active')[0].style.display == 'none'){
        $('#preloader-active')[0].style.display = 'block';
    }else {
        $('#preloader-active')[0].style.display = 'none';
    }
}
function updateDefaultSidebarCart(products){
    // return;
    console.log(products);
    $(".mobile-header-content-area .cart-items-sidebar-mobile")[0].innerHTML = "";
    var subtotal = 0;
    var saved = 0;
    var grandtotal = 0;
    if(products ){
        products.data.forEach(element => {
            var img = default_image;
            if(element.product.productImageUrl != ""){
                img = base_url_images+element.product.productImageUrl;
            }
            var p1 = ((parseInt(element.specialPrice) > 0 ) ? parseInt(element.specialPrice) : parseInt(element.currentPrice));
            var p2 = ((parseInt(element.specialPrice) > 0) ? "Rs. "+ parseInt(element.currentPrice) : "");
            subtotal += (p1 * element.qty);
            saved += (parseInt(element.specialPrice)>0 ? element.currentPrice-element.specialPrice : 0 );
            $('.mobile-header-content-area .cart-items-sidebar-mobile')[0].innerHTML += 
                `<li class="row">
                    <div class="col-3 img-border-5 pr-0">
                    <a href="shop-product-full.html?sku=`+element.sku+`"><img src="`+img+`" alt=""></a>
                    </div>
                    <div class="col-7">
                        <!-- text length 24 max -->
                        <div class="align-self-start fw-700"><a href="shop-product-full.html?sku=`+element.sku+`">`+element.product.title.substring(0, 21) +`.</a></div> 
                        <div class="align-self-center">`+element.qty+" x "+`Rs. `+ p1 +` <span  class="text-decoration-line-through color-red ml-20">`+p2+`</span></div>
                        <div class="align-self-end">
                            <button onclick="return addMetoCart(this,'`+element.sku+`',`+(element.qty-1)+`)" class="ml-0"><p>-</p></button>
                            <span>`+element.qty+`</span>
                            <button onclick="return addMetoCart(this,'`+element.sku+`',`+(element.qty+1)+`)"><p>+</p></button></div>
                    </div>
                    <div class="col-1 color-red ml-20"><i onclick=\"return removeMeFromCart('`+element.sku+`', '`+element.qty+`')\" class="far fa-trash-alt"></i></div>
                </li>`;
            // $('.mobile-header-content-area .cart-items-sidebar-mobile')[0].innerHTML += "<li> <div class=\"shopping-cart-img\"> <a href=\"shop-product-full.html?sku="+element.sku+"\"><img alt=\"Evara\" src=\""+img+"\"></a> </div><div class=\"shopping-cart-title\"> <h4><a href=\"shop-product-full.html?sku="+element.sku+"\">"+element.product.title.substring(0, 15)+"."+"</a></h4> <h4><span>"+element.qty+" × </span>"+"Rs. "+element.currentPrice+"</h4> </div><div class=\"shopping-cart-delete\"> <a href=\"#\" onclick=\"return removeMeFromCart('"+element.sku+"', '"+element.qty+"')\" ><i class=\"fi-rs-cross-small\"></i></a> </div></li>"
        
            grandtotal = subtotal;
        });
        $('#sidebar_subtotal')[0].innerHTML = "Rs. "+ subtotal;
        $('#sidebar_save')[0].innerHTML = "Rs. "+ saved;
        $('#sidebar_total')[0].innerHTML = "Rs. "+ grandtotal;
        $('.header-action-icon-2.mobile span.pro-count')[0].innerHTML = products.data.length;
    }

}
function updateDefaultSidebar() {
    var categories_dropdown = 'header_dropdown_categories';
    if(getDeviceSizeCode()< 3){
        categories_dropdown = 'header_dropdown_categories-mobile';
    }
    $.ajax({
        url: base_url_api+"home/all?client_lat=24.881308&client_long=67.06022&city="+getCookie('city_confirm_guest').toLocaleLowerCase(),
        context: document.body
      })
    .done(function(data) {
        // $("#"+categories_dropdown)[0].innerHTML  = "";
        // if($("#"+categories_dropdown)[0]){
        //     data.data.categories.forEach(element => {
        //         $("#"+categories_dropdown)[0].innerHTML +=  
        //         `<li><a href="shop-filter.html?category=`+element.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en">`+element.name+`</a></li>`;
        //     });
        // }
        if($("#"+categories_dropdown)[0]){
            $("#"+categories_dropdown)[0].innerHTML  = "";
            data.data.categories.forEach(element => {
                $("#"+categories_dropdown)[0].innerHTML +=  
            //   `<li><a href="shop-filter.html?category=`+element.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en"><i class="evara-font-desktop"></i>`+element.name+`</a></li>`; 
               `<li `+((element.childrenData.length>0)? "class='has-children'":"") +`>
                    <a href="shop-filter.html?category=`+element.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en">`+element.name+`</a> 
                    `+getHeaderChild(element)+`
                </li>`;
            });
        }
        
    });
}
function getHeaderChild(child) {
    var temp = '';
    if(child.childrenData.length > 0){
          child.childrenData.forEach(element2 => {
            temp += `<li><a class="dropdown-item nav-link nav_item" href="shop-filter.html?category=`+element2.id+`&page=1&&size=12&sortType=&sortDirection=asc&instant=3&city=`+getCookie('city_confirm_guest')+`&lang=en">`+element2.name+`</a></li>`;
        });
        return `<div class="dropdown-menu">
            <ul class="mega-menu d-lg-flex">
                <li class="mega-menu-col col-lg-12">
                    <ul class="d-lg-flex">
                        <li class="mega-menu-col col-lg-12">
                            <ul>
                                `+temp+`
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>`;
   }
   return '';
}
$( document ).ready(function() {
    redirectToLoggedInPages();
    redirectToIndex();
    getCart();
    initHeader();
    
    
    
    // $('#quickViewModal').on('show.bs.modal', function (e) {
    //     var bookId = $(e.relatedTarget).data('sku-id');
    //     var data =$(e.relatedTarget).data();
    //     console.log(data);
    //     console.log();
    //     $('#quickViewModal').find(".title-detail")[0].innerText = data.titleId;
    //     $('#quickViewModal').find(".pro-details-brand span")[0].innerText = "Brands: -";
    //     $('#quickViewModal').find(".product-price .text-brand")[0].innerText = "Rs." +( data.specialpriceId > 0  ? data.specialpriceId: data.currentpriceId);
    //     $('#quickViewModal').find(".product-price .old-price")[0].innerText = "Rs." + (data.specialpriceId > 0 ? data.currentpriceId : '0') ;
    //     $('#quickViewModal').find(".short-desc .font-sm")[0].innerText = data.descriptionId;
        
    //     // console.log($(e.relatedTarget).find('div[class="title-detail"]'));
    //     // $(e.currentTarget).find('input[class="title-detail"]').val(data.titleId);
    //     // $('#quickViewModal')[0].innerHTML = "<div class=\"detail-info\"> <h3 class=\"title-detail mt-30\">"+data.titleId+"</h3> <div class=\"product-detail-rating\"> <div class=\"pro-details-brand\"> <span> Brands: <a href=\"shop-grid-right.html\"></a></span> </div><div class=\"product-rate-cover text-end\"> <div class=\"product-rate d-inline-block\"> <div class=\"product-rating\" style=\"width:90%\"> </div></div><span class=\"font-small ml-5 text-muted\"> (0 reviews)</span> </div></div><div class=\"clearfix product-price-cover\"> <div class=\"product-price primary-color float-left\"> <ins><span class=\"text-brand\">"+ data.specialpriceId > 0 ? data.specialpriceId : data.currentpriceId+"</span></ins> <ins><span class=\"old-price font-md ml-15\">$200.00</span></ins> <span class=\"save-price font-md color3 ml-15\">25% Off</span> </div></div><div class=\"bt-1 border-color-1 mt-15 mb-15\"></div><div class=\"short-desc mb-30\"> <p class=\"font-sm\">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi,!</p></div><div class=\"attr-detail attr-color mb-15\"> <strong class=\"mr-10\">Color</strong> <ul class=\"list-filter color-filter\"> <li><a href=\"#\" data-color=\"Red\"><span class=\"product-color-red\"></span></a></li><li><a href=\"#\" data-color=\"Yellow\"><span class=\"product-color-yellow\"></span></a></li><li class=\"active\"><a href=\"#\" data-color=\"White\"><span class=\"product-color-white\"></span></a></li><li><a href=\"#\" data-color=\"Orange\"><span class=\"product-color-orange\"></span></a></li><li><a href=\"#\" data-color=\"Cyan\"><span class=\"product-color-cyan\"></span></a></li><li><a href=\"#\" data-color=\"Green\"><span class=\"product-color-green\"></span></a></li><li><a href=\"#\" data-color=\"Purple\"><span class=\"product-color-purple\"></span></a></li></ul> </div><div class=\"attr-detail attr-size\"> <strong class=\"mr-10\">Size</strong> <ul class=\"list-filter size-filter font-small\"> <li><a href=\"#\">S</a></li><li class=\"active\"><a href=\"#\">M</a></li><li><a href=\"#\">L</a></li><li><a href=\"#\">XL</a></li><li><a href=\"#\">XXL</a></li></ul> </div><div class=\"bt-1 border-color-1 mt-30 mb-30\"></div><div class=\"detail-extralink\"> <div class=\"detail-qty border radius\"> <a href=\"#\" class=\"qty-down\"><i class=\"fi-rs-angle-small-down\"></i></a> <span class=\"qty-val\">1</span> <a href=\"#\" class=\"qty-up\"><i class=\"fi-rs-angle-small-up\"></i></a> </div><div class=\"product-extra-link2\"> <button type=\"submit\"  class=\"button button-add-to-cart\">Add to cart</button> <a aria-label=\"Add To Wishlist\" class=\"action-btn hover-up\" href=\"shop-wishlist.html\"><i class=\"fi-rs-heart\"></i></a> <a aria-label=\"Compare\" class=\"action-btn hover-up\" href=\"shop-compare.html\"><i class=\"fi-rs-shuffle\"></i></a> </div></div><ul class=\"product-meta font-xs color-grey mt-50\"> <li class=\"mb-5\">SKU: <a href=\"#\">FWM15VKT</a></li><li class=\"mb-5\">Tags: <a href=\"#\" rel=\"tag\">Cloth</a>, <a href=\"#\" rel=\"tag\">Women</a>, <a href=\"#\" rel=\"tag\">Dress</a> </li><li>Availability:<span class=\"in-stock text-success ml-5\">8 Items In Stock</span></li></ul> </div>"
    // })
    

    // $.ajax({
    //       url: "https://staging.apricart.pk/erp/v1/home/all?client_lat=24.881308&client_long=67.06022",
    //       context: document.body
    //     })
    // .done(function(data) {
    //     if(data.data.length){
    //         $("#sidebar_categories")[0].innerHTML  = "";
    //         data.data.forEach(element => {
    //             $("#sidebar_categories")[0].innerHTML  += "<li><a href=\"shop-grid-right.html\">"+element.name+"</a></li>"
    //         });
    //     }
    // });
    
    if (window.location.pathname.indexOf('/')> 0) {
        // $.ajax({
        //     url: "https://staging.apricart.pk/erp/v1/home/all?client_lat=24.881308&client_long=67.06022",
        //     context: document.body
        //   })
        // .done(function(data) {
        //     // Recommended Products
        //     if(data.data.products.length){
        //         $("#default_products_home")[0].innerHTML  = "";
        //         data.data.products[0].data.forEach(element => {
        //             if(element.maxQty > 0){
        //                 var itemAvailableCheck = checkInCartFromCookie(element.sku);
        //                 if(itemAvailableCheck.length > 0) {
        //                     $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-right.html\"> <img class=\"default-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-action-1\"> <a aria-label=\"Quick view\" data-sku-id=\""+element.sku+"\" data-title-id=\""+element.title+"\"  data-specialprice-id=\""+element.specialPrice+"\"  data-currentPrice-id=\""+element.currentPrice+"\" data-description-id=\""+element.description+"\"  data-minQty-id=\""+element.minQty+"\"  data-maxQty-id=\""+element.maxQty+"\"  data-productImageUrl-id=\""+element.productImageUrl+"\"  class=\"action-btn hover-up\" data-bs-toggle=\"modal\" data-bs-target=\"#quickViewModal\"><i class=\"fi-rs-eye\"></i></a> <a aria-label=\"Add To Wishlist\" class=\"action-btn hover-up\" href=\"shop-wishlist.html\"><i class=\"fi-rs-heart\"></i></a> <a aria-label=\"Compare\" class=\"action-btn hover-up\" href=\"shop-compare.html\"><i class=\"fi-rs-shuffle\"></i></a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-right.html\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? element.specialPrice: element.currentPrice) +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.currentPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(itemAvailableCheck[0].split('@=')[1]-1)+")\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">"+itemAvailableCheck[0].split('@=')[1]+"</button><button onclick=\"return addMetoCart(this,\'"+itemAvailableCheck[0].split('@=')[0]+"\',"+(parseInt(itemAvailableCheck[0].split('@=')[1])+1)+")\" class=\"button cart-buttons button-add-to-cart-max\">+</button></div></div></div>"
        //                 } else {
        //                     $("#default_products_home")[0].innerHTML  += "<div class=\"col-lg-3 col-md-3 col-6 col-sm-4\"> <div class=\"product-cart-wrap mb-30\"> <div class=\"product-img-action-wrap\"> <div class=\"product-img product-img-zoom\"> <a href=\"shop-product-right.html\"> <img class=\"default-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> <img class=\"hover-img\" src=\""+"https://www.apricart.pk"+"/media/catalog/product"+element.productImageUrl+"\" alt=\"\"> </a> </div><div class=\"product-action-1\"> <a aria-label=\"Quick view\" data-sku-id=\""+element.sku+"\" data-title-id=\""+element.title+"\"  data-specialprice-id=\""+element.specialPrice+"\"  data-currentPrice-id=\""+element.currentPrice+"\" data-description-id=\""+element.description+"\"  data-minQty-id=\""+element.minQty+"\"  data-maxQty-id=\""+element.maxQty+"\"  data-productImageUrl-id=\""+element.productImageUrl+"\"  class=\"action-btn hover-up\" data-bs-toggle=\"modal\" data-bs-target=\"#quickViewModal\"><i class=\"fi-rs-eye\"></i></a> <a aria-label=\"Add To Wishlist\" class=\"action-btn hover-up\" href=\"shop-wishlist.html\"><i class=\"fi-rs-heart\"></i></a> <a aria-label=\"Compare\" class=\"action-btn hover-up\" href=\"shop-compare.html\"><i class=\"fi-rs-shuffle\"></i></a> </div><div class=\"product-badges product-badges-position product-badges-mrg\"> <span class=\"hot\">Hot</span> </div></div><div class=\"product-content-wrap\"> <div class=\"product-category\"> <a href=\"shop-grid-right.html\"></a> </div><h2><a href=\"shop-product-right.html\">"+element.title+"</a></h2> <div class=\"product-price\"> <span>"+  (element.specialPrice > 0 ? element.specialPrice: element.currentPrice) +" Rs"+"</span> <span class=\"old-price\">"+(element.specialPrice > 0 ? element.currentPrice: "")+"</span> </div><div id=\"add_cart_btns_container_"+element.sku+"\"><div class=\"detail-extralink\"><div class=\"product-extra-link2\" id=\""+"add_cart_btn_"+element.sku+"\"><button type=\"submit\" class=\"button button-add-to-cart\" onclick=\"return addMetoCart(this,'"+element.sku+"',"+(element.qty +1)+")\" >Add To Cart</button></div></div></div></div></div></div>"
        //                 }
                        
        //                 // $('#add_cart_btn_'+sku)[0].innerHTML = "<button onclick=\"return addMetoCart(this,\''+_sku[0].sku+'\','+(_sku[0].qty-1)+')\" class=\"button cart-buttons button-add-to-cart-min\">-</button><button  class=\"button button-add-to-cart-showqty\">'+_sku[0].qty+'</button><button onclick=\"return addMetoCart(this,\''+_sku[0].sku+'\','+(_sku[0].qty+1)+')\" class=\"button cart-buttons button-add-to-cart-max\">+</button>"

        //             }
        //         });
        //     }
        //     // Categories
        //     if(data.data.categories.length){
        //         $("#sidebar_categories")[0].innerHTML  = "";
        //         // data.data.categories.forEach(element => {
        //         //     $("#sidebar_categories")[0].innerHTML += "<li class=\"nav-item\"><a class=\"nav-link\" onclick=\"getCategoryProducts('"+element.name+"') href=\"#\"> "+element.name+" <b class=\"float-end\">&raquo;</b> </a><ul class=\"submenu dropdown-menu\"><li><a class=\"nav-link\" href=\"#\">Submenu item 1 </a></li><li><a class=\"nav-link\" href=\"#\">Submenu item 2 </a></li><li><a class=\"nav-link\" href=\"#\">Submenu item 3 <b class=\"float-end\">&raquo;</b> </a><ul class=\"submenu dropdown-menu\"><li><a class=\"nav-link\" href=\"#\">Multi level 1</a></li><li><a class=\"nav-link\" href=\"#\">Multi level 2</a></li><li><a class=\"nav-link\" href=\"#\">Multi level 3</a></li></ul></li></ul></li>"
        //         //     // $("#sidebar_categories")[0].innerHTML  += "<li><a onclick=\"getCategoryProducts('"+element.name+"')\">"+element.name+"</a></li>"
        //         // });

        //         data.data.categories.forEach(element => {
        //             $("#sidebar_categories")[0].innerHTML +=  `<li class="nav-item">
        //             <a class="nav-link" href="#"  onclick="getCategoryProducts("`+element.name+`")> `+element.name+` <b class="float-end">&raquo;</b> </a>'+
        //                 '<ul class="submenu dropdown-menu">` +
        //                 element.childrenData.forEach(element2 => {
        //                     `<li><a class="nav-link" href="#" onclick="getCategoryProducts("`+element2.name+`") >`+element2.name+`<b class="float-end">&raquo;</b> </a>
        //                         <ul class="submenu dropdown-menu">` +
        //                         element2.childrenData.forEach(element3 => {
        //                             `<li><a class="nav-link" href="#" onclick="getCategoryProducts("`+element3.name+`")">`+element3.name+`</a></li>`
        //                         });
        //                         `</ul>
        //                     </li>`
        //                     });
        //                 `</ul>
        //             </li>`
        //         }); 

        //     }
        // });
    }
    

    // $( "#home-top-search" ).change(function(){
        
    // });
});

// function getSearchResults(params) {
//         console.log($( "#home-top-search" ).val());
//     }