angular.module('journal-material.filters', [])

.filter("longText", function(){
    return function(text){
        if(text.length > 200)
            return text.slice(0, 200) + "...";
        else
            return text;
    }
})
;