

                (function(){
                    const Func = (function() {
                        this.isLive&&window.location.pathname.includes("challenge")&&setTimeout(function(){var e=document.querySelector(".shopify-challenge__container");console.log(e),e.scrollIntoView()},100)
                    
                    });
                    const settings = {};
                    const ID = 'ecom-03y55tiptmwn';
                    document.querySelectorAll('.ecom-03y55tiptmwn').forEach(function(el){
                        Func.call({$el: el, settings, id:ID,isLive: true});
                    });
                })();
            
            if(window.location.search.indexOf("ecom-token=") < 0)
            {
                document.querySelector(".ecom-builder").innerHTML = '<h3 style="width:100%;display:block;text-align:center">This template for preview purposes only</h3>';
                document.querySelector("body").style.opacity= "0.7";
            }
            if(window.Shopify && window.Shopify.theme && window.Shopify.theme.id){
                const url = new URL(window.location);
                url.searchParams.set('preview_theme_id',  window.Shopify.theme.id);
                window.history.pushState({}, '', url);
            }
        