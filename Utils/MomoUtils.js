/**
 * 此腳本必須在momo頁面上才能正確執行
 **/
class MomoUtils {

    constructor() {
        this.textSearchUrl = "https://apisearch.momoshop.com.tw/momoSearchCloud/moec/textSearch";
    }

    fetchTextSearch(setting) {
        return fetch(this.textSearchUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json;",
            },
            body: JSON.stringify(setting)
        }).then(v => v.json());
    }

    async search() {
        let setting = this.buildSearchSetting();
        let res = await this.fetchTextSearch(setting);
        console.log(res);
        return res;
    }

    buildSearchSetting() {
        var nowCateInfo = getNowCateInfo();
        var defSetting = {
            pageNum: 1,
            cateCode: nowCateInfo.nowCate,
            cateLv: nowCateInfo.nowCateLv,
            ajaxSuccess: showPage,
            historyDoPush: true
        };

        momoj.extend(defSetting, undefined);

        var p1 = momoj('#priceS').val();
        var p2 = momoj('#priceE').val();

        if (!isFinite(p1) || !isFinite(p2)) {
            alert('價格區間請輸入數字');
            momoj('#priceS').val('');
            momoj('#priceE').val('');
            return false;
        }

        var obj = new Object();
        if (params.specialGoodsType != undefined) { //作者專區
            obj.specialGoodsType = params.specialGoodsType;
        }
        if (params.authorNo != undefined) {
            obj.authorNo = params.authorNo; //作者編號
        }
        obj.searchValue = momoj().decodeHTML(params.keyword);
        obj.cateCode = defSetting.cateCode;
        obj.cateLevel = defSetting.cateLv.toString();
        obj.cp = momoj('.optionsLi #optionsLi_01').is(':checked') ? 'Y' : 'N'; //折價券
        params._advCp = obj.cp;
        obj.NAM = momoj('.optionsLi #optionsLi_02').is(':checked') ? 'Y' : 'N'; //分期0利率
        params._advNam = obj.NAM;
        //obj.normal = momoj('.optionsLi #optionsLi_03').is(':checked') ? 'Y' : 'N';      //宅配
        obj.first = momoj('.optionsLi #optionsLi_04').is(':checked') ? 'Y' : 'N'; //12H速達
        params._advFirst = obj.first;
        obj.freeze = momoj('.optionsLi #optionsLi_11').is(':checked') ? 'Y' : 'N'; //低溫宅配
        params._advFreeze = obj.freeze;
        obj.superstore = momoj('.optionsLi #optionsLi_05').is(':checked') ? 'Y' : 'N'; //超商取貨
        params._advSuperstore = obj.superstore;
        obj.tvshop = momoj('.optionsLi #optionsLi_06').is(':checked') ? 'Y' : 'N'; //TV商品
        params._advTV = obj.tvshop;
        obj.china = momoj('.optionsLi #optionsLi_07').is(':checked') ? 'Y' : 'N'; //直配大陸
        params._advChina = obj.china;
        obj.tomorrow = momoj('.optionsLi #optionsLi_08').is(':checked') ? 'Y' : 'N'; //隔日配
        params._advTomorrow = obj.tomorrow;
        obj.stockYN = momoj('.optionsLi #optionsLi_03').is(':checked') ? 'Y' : 'N'; //商品有量
        params._advStock = obj.stockYN;
        obj.prefere = momoj('.optionsLi #optionsLi_09').is(':checked') ? 'Y' : 'N'; //大家電安心配
        params._advPrefere = obj.prefere;
        obj.threeHours = momoj('.optionsLi #optionsLi_10').is(':checked') ? 'Y' : 'N'; //3h到貨
        params._advThreeHours = obj.threeHours;
        obj.showType = momoj('[name="showType"]:checked').val(); //呈現排列方式
        obj.curPage = defSetting.pageNum.toString();
        obj.priceS = p1 ? p1 : "0";
        if (obj.NAM == 'Y') {
            obj.priceS = Math.max(obj.priceS, 1000).toString();
        }
        obj.priceE = p2 ? p2 : "9999999";
        obj.searchType = getSearchType().toString();
        obj.reduceKeyword = "";

        var selectedAttr = getSelectedAttr();
        if (selectedAttr.length > 0) {
            obj.indexInfoList = selectedAttr;
        }
        momoj('.goodsAttrTr').remove();
        momoj('.attributesotherListArea ul').empty();
        closeOtherAttrBox();

        var selectedBrands = getSelectedBrandName();
        if (selectedBrands.length > 0) {
            obj.brandName = selectedBrands;
        }
        var selectedBrandsNo = getSelectedBrandNo();
        if (selectedBrandsNo.length > 0) {
            obj.brandCode = selectedBrandsNo;
        }
        momoj('.goodsBrandTr').remove();

        if (isFuzzy != null) {
            obj.isFuzzy = isFuzzy ? '1' : '0'; //true:模糊;false:精準 jrhsu 2020/06/16
        }

        //去什麼回什麼
        obj.rtnCateDatainfo = {
            cateCode: defSetting.cateCode,
            cateLv: defSetting.cateLv.toString(),
            keyword: momoj().decodeHTML(params.keyword),
            curPage: defSetting.pageNum.toString(),
            historyDoPush: defSetting.historyDoPush,
            timestamp: new Date().getTime()
        };

        //obj.flag = 2018; //查ajaxTool找對應的API
        //couponSearch
        if (!isUndefined(params.couponSeq)) {
            obj.couponSeq = params.couponSeq;
            obj.flag = 2023;
        } else {
            isCallDirectSearchAPI = true;
            obj.flag = 2018;
        }
        //couponSearch

        //組出屬性中文名稱
        if (Object.keys(params.checkedAttrs).length > 0) {
            obj.checkedAttrs = params.checkedAttrs;
        }
        //組出屬性號碼
        if (Object.keys(params.checkedAttrsNo).length > 0) {
            obj.checkedAttrsNo = params.checkedAttrsNo;
        }
        //組出屬性title中文名稱
        if (Object.keys(params.checkedIndexName).length > 0) {
            obj.checkedIndexName = params.checkedIndexName;
        }
        obj.ajaxSuccess = defSetting.ajaxSuccess;
        obj.ajaxCancel = showNoResult;
        obj.async = true;
        return obj;
    }
}

let momoUtils = new MomoUtils();