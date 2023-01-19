$(function () {
    let timer = null
    let cacheObj = {}
    $('#iptSearch').on('keyup', function () {
       
        clearTimeout(timer)
        let keyWords = $(this).val().trim()
        
        if (keyWords.length <= 0) {
            return $('#suggest').empty().hide()
        } 
        if(cacheObj[keyWords]) {
            return debounceSearch(cacheObj[keyWords])

        }
            debounceSearch(keyWords)
        
    })
    $('#btnSearch').on('click', function () {
        console.log(11);


    })
    function getSuccessList(kw) {
        let result = []
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + kw,
            dataType: 'jsonp',
            success: function (res) {
                
                renderSuggestList(res)


            }
        })
        return result

    }
    function renderSuggestList(res) {
        if (res.result.length <= 0 ) {
           return $('#suggest').empty().hide()
            
        }
       
            let htmlStr = template('tpl-suggList',res)
            console.log(htmlStr);
            $('#suggest').html(htmlStr).show()
            let k =$('#iptSearch').val().trim()  
            let v = res
            cacheObj[k] =v


    }
    
    function debounceSearch(kw) {
         timer = setTimeout(function() {
            getSuccessList(kw)
        },5000)

    }

})