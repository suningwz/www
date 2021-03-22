/**
* 模型 - Model
*/

var Note = Backbone.Model.extend({
    defaults:{      //Model实例默认的属性
        title:'',
        created_at:new Date()
    },
    initialize:function(){   //Model实例化时调用initialize函数
        console.log('新建了一条笔记：'+this.get('title'));
        this.on('change',function(model,options){  //change事件，当model实例的属性值发生变化时，触发对应的函数
            console.log('属性发生了变化');
        });
        this.on('change title',function(model,options){  //title属性发生change事件时，触发对应的函数
            console.log('title发生了变化');
        });

        this.on('invalid',function(model,error){   //绑定valid事件函数
            console.log(error);
        });

    },
    //validate函数验证不通过时，触发invalid事件，validate函数返回值作为invalid函数的error参数传入
    validate:function(attributes,options){   //Note实例note执行note.set('title','hi',{'validate':true})时，会调用validate方法验证
        if(attributes.title.length<3){
            return 'title长度必须大于3';
        }
    }
});

/**
 * 视图 - View
 * el属性，是DOM元素，视图通过它组织内容，默认是div标签
 * 视图里的render方法可以model的change事件绑定，这样model属性变化后，可以马上反映到视图上
 */
var NoteView = Backbone.View.extend({
    tagName:'li',
    className:'item',  //设置标签的class
    //设置li标签的属性,属性名带有“-”，所以要用引号
    attributes:{
        'data-role':'list'
    },

    //underscore的template函数使用范例：
    //var compiled = _.template("hello: <%= name %>");
    //var html = compiled({name: 'moe'}); // hello: moe
    //template属性关联underscore的template函数返回的结果（预编译函数）；通过jQuery获取页面上模板标签的内容，作为参数传入underscore的template函数里；
    template:_.template(jQuery('#list-template').html()),

    render:function(){
        //this.$el.html(this.model.get('title'));
        //渲染模板上的内容。view的template属性是一个预编译函数，向该函数传入model的属性。
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

var note = new Note({    //实例化model
    title:'西红柿炒鸡蛋的做法'
});

var noteView = new NoteView({    //实例化视图，设置这个视图实例关联的模型实例
    model:note
});
//在控制台执行以下命令查看,比对执行render前后，noteView的标签内容的差异
//noteView.el
//noteView.render()
//noteView.el

/**
 * 集合 - Collection
 */

var NoteCollection = Backbone.Collection.extend({
    model:Note,

    initialize:function(){
        this.on({
            'add':function(model,collection,options){
                console.log('ID:'+model.id+'模型添加到了集合里');
            },
            'remove':function(model,collection,option){
                console.log('ID:'+model.id+'模型从集合里删除了');
            },
            'change':function(model,option){
                console.log('集合里的模型发生了变化');
            }
        })
    }
});

var note1 = new Note({id:1,title:'麻婆豆腐的做法'});
var note2 = new Note({id:2,title:'周六参加朋友的婚礼'});
var note3 = new Note({id:3,title:'晚上回家洗尿布'});

//对集合的操作：添加、删除、重置、更新、排序集合里的模型的时候，都会触发相应的事件。
//add、remove、reset、set、pop、shift、push、unshift、at:index
//获取在集合里的模型get(id)，at(index)


/**
 * 集合视图 = Collection View   
 * 把集合里面的每个渲染之后的模型的视图放在集合视图里
 */
var NoteCollectionView = Backbone.View.extend({
    tagName:'ul',

    initialize:function() {  //实例化NoteCollectionView时，传入一个字典，collection键对应一个Collection实例
        //on事件的函数签名： object.on(event, callback, [context])
        this.collection.on('add',this.addOne,this);   //监听collection，会将添加到集合collection里的模型实例作为参数传入到addOne函数里。
        this.render();  //实例化的时候，页面上为什么不会立即显示collection已有的note记录？？？因为还没有将noteCollectionView插入到页面中。
    },  //需要在控制台执行jQuery('#note_list').html(noteCollectionView.el)才会将当前noteCollectionview的内容插入到页面里。

    render:function(){  
        this.collection.each(this.addOne,this);  //将collection里的每个模型实例传入到addOne里进行处理
        return this;
    },  //render函数的作用是将集合collection里已有的模型实例传给addOne函数：为它们创建模型视图，并插入到集合视图的标签里

    addOne:function(note){   //怎么确定传入addOne的参数是一个note实例呢？请看用到该函数的render和initialize函数的注释。
        var noteView = new NoteView({model:note});
        this.$el.append(noteView.render().el);
    }  //addOne函数的作用是为传入的模型实例化一个模型视图noteView，并将模型视图的标签插入到集合视图的标签里面

});

var noteCollection = new NoteCollection([note1,note2,note3]);
var noteCollectionView = new NoteCollectionView({collection:noteCollection});