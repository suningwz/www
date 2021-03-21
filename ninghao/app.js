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

        this.on('invalid',function(model,error){
            console.log(error);
        });

    },
    validate:function(attributes,options){
        if(attributes.title.length<3){
            return 'title长度必须大于3';
        }
    }
});
