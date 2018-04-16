
var curUrl = location.href
var height = 0
console.log(curUrl)

var it = setInterval(function(){
    t = document.documentElement.scrollTop;
    h = document.documentElement.scrollHeight;
    //console.log(height)
    if (h != height){
        window.scrollTo(0, h)
        height = h
    }else{
        //console.log('touched bottom')
        window.scrollTo(0, 222)
        
        if (curUrl.indexOf('coupon_batch=')!=-1){ // 凑单页
            
            $('li[class="gl-item"]').each(function(){
                console.log('sku:'+$(this).attr('data-sku'))
            });
            var fp = $('a[class="fp-next disabled"]')
            if (fp.length > 0){
                clearInterval(it)
            }else{
                $('a[class="fp-next"]').get(0).click()
            }
            
            //$('a[class="fp-next"]').trigger('click')
            //document.getElementsByClassName('fp-next')[0].click();
            
        }else{ // 领券页
            
            $('a[class="btn btn-def"]').each(function(){
                var that = $(this)
                var batch_id = that.attr('data-batch')
                
                setTimeout(function(){
                    getsku(batch_id, that)
                },2000)
            });
            
            clearInterval(it)
            
        }
        
    }
}, 1000);

var getsku = function(batch_id, ele){
    var batch_url = 'https://search.jd.com/Search?coupon_batch='+batch_id
    $.ajax({
        url: batch_url,
        data: '',
        success: function(res){
            var gl = $(res).find('li[class="gl-item"]')
            
            console.log(ele, gl.length, batch_url)
            
            //gl.each(function(){
            //    console.log(batch_id+":"+$(this).attr('data-sku'))
            //});
        },
        dataType: 'html'
    });
}
