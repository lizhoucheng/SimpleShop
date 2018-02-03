function init(){
    var keyword=localStorage["searchKey"];
    localStorage.removeItem("searchKey");
    console.log(keyword);
    ebay(keyword);
    walmart(keyword);
}

function ebay(key){
    // Construct the request
// Replace MyAppID with your Production AppID
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=Zhouchen-pricecom-PRD-55d705b3d-9bf0a867";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_ebay";
    url += "&REST-PAYLOAD";
    url += "&keywords="+key;
    url += "&outputSelector(0)=SellerInfo";
    url += "&paginationInput.entriesPerPage=3";
    
    // Submit the request
    s=document.createElement('script'); // create script element
    s.src= url;
    document.body.appendChild(s);
}

function _cb_ebay(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  /*var html = [];
  html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
    for(var i = 0; i < items.length; ++i){
        var item     = items[i];
        var title    = item.title;
        var pic      = item.galleryURL;
        var viewitem = item.viewItemURL;
        var price    = item.sellingStatus[0].currentPrice[0]['__value__']
        if (null != title && null != viewitem) {
          html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
          '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td><td>' + 
                    price + '</td></tr>');
        }
    }
    html.push('</tbody></table>');
  document.getElementById("results").innerHTML = html.join("");*/
    
    document.getElementById("title1").innerHTML=items[0].title;
    document.getElementById("image1").src=items[0].galleryURL;
    document.getElementById("productURL1").setAttribute('href', items[0].viewItemURL);
    document.getElementById("sellerRating1").innerHTML=items[0].sellerInfo["0"].positiveFeedbackPercent+"/100.0";
    document.getElementById("price1").innerHTML=items[0].sellingStatus[0].currentPrice[0]['__value__'];
    document.getElementById("shippingCost1").innerHTML=items[0].shippingInfo[0].shippingServiceCost[0]['__value__'];
}  

function walmart(key){

    var url = "https://api.walmartlabs.com/v1/search?apiKey=2vprfuvctkj8bey3jr22t3nt";
        url += "&query="+key;
        url += "&numItems=2";
        url += "&callback=_cb_walmart";

    // Submit the request
    s=document.createElement('script'); // create script element
    s.src= url;
    document.body.appendChild(s);
}

function _cb_walmart(root) {
    /*console.log(root);
    var items = root
      var html = [];
      html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
        var title    = root.items[0].name;
        var pic      = root.items[0].largeImage;
        var viewitem = root.items[0].productUrl;
        var price    = root.items[0].salePrice
        if (null != title && null != viewitem) {
          html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
          '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td><td>' + 
                    price + '</td></tr>');
        }

        html.push('</tbody></table>');
      document.getElementById("results").innerHTML = html;*/
    var items=root.items;
    document.getElementById("title2").innerHTML=items[0].name;
    document.getElementById("image2").src=items[0].mediumImage;
    document.getElementById("productURL2").setAttribute('href', items[0].productUrl);
    document.getElementById("itemRating2").innerHTML=items[0].customerRating+"/5.00";
    document.getElementById("price2").innerHTML=items[0].salePrice;
    document.getElementById("shippingCost2").innerHTML=items[0].standardShipRate;
} 

function searchKeyword(){
    var keyword=localStorage["searchKey"]=document.getElementById('keyword').value;
    ebay(keyword);
    walmart(keyword);
}