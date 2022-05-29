const mongoose = require('mongoose');
const User = require('./Schema/user');
const Forum = require('./Schema/forum');
const Like = require('./Schema/like');
const Comment = require('./Schema/comment');
const Blog = require('./Schema/blog');

const {dbURL} = require('./config')
main();

async function main() {
    await mongoose.connect(dbURL, {
        useNewUrlParser: true
    });
    await clearDatabase()
    await initData();
    await mongoose.disconnect();
}

async function clearDatabase() {
    await User.deleteMany({});
    await Forum.deleteMany({});
    await Like.deleteMany({})
    await Comment.deleteMany({})
    await Blog.deleteMany({})
    console.log(`delete tables`)
}

async function initData() {
    const userLength = 2;
    const forumLength = 50;
    const likeLength = 2;
    const blogLength = 2;
    let commentLength = 0;
    
    const admin = new User({
        username:"Admin",
        password:"123456",
        role:"admin"
    })
    let tempUser = null
    for(let i = 0;i<userLength;i++){
        let user = new User({
            username:`Test${i}`,
            password:'123456'
        })
        tempUser = user
        await user.save();
    }
    for(let i = 0;i<forumLength;i++){
        let forum = new Forum({
            userId:admin._id,
            title:"Test Title"+i,
            content:"Test Content" + i,
        })
        forum.save()
        if(i%2==0&&i<parseInt(forumLength/2)){
            let comment = new Comment({
                fid:forum._id,
                replyId:forum._id,
                userId:tempUser._id||admin._id,
                content:"content"+i
            })
            commentLength+=1;
            await comment.save()
        }
        if(i<likeLength&&i<forumLength&&tempUser){
            let like = Like({
                fid:forum._id,
                userId:tempUser._id
            })
            await like.save()
        }
    }
    await admin.save()


    let blog = new Blog({
        title:"Council approves Marian Street Theatre to start construction!",
        content:"The council has recently approved the building plans for Marian Street Theatre, with an estimated opening date in 2024"
    })
    let blog2 = new Blog({
        title:"Council approves Marian Street Theatre to start construction!",
        content:"MST Next Gen has been proposed as a project to increase the engagement of the community with Marian Street Theatre. Once the theatre re-opens, we hope that this website will be a hub for the theatre community and any events."
    })
    await blog.save()
    await blog2.save()

    console.log(`user added ${userLength} `);
    console.log(`admin added`);
    console.log(`forum added ${forumLength} `);
    console.log(`comment added ${commentLength} `);
    console.log(`like added ${likeLength} `);
    console.log(`blog added 2 `);
    
}