/**
* 模型 - Model
*/

var Note = Backbone.Model.extend({
    defaults:{
        title:'',
        created_at:new Date()
    },
    initialize:function(){
        console.log('新建了一条笔记：'+this.get('title'));
        this.on('change',function(model,options){
            console.log('属性发生了变化');
        });
        this.on('change title',function(model,options){
            console.log('title发生了变化');
        });

    }
});
