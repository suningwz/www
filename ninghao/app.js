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
    }
});
