import image from '../assets/images/test_profile.jpg';

export const navigationTabs = [
    { id: 1, title: 'Following' },
    { id: 2, title: 'Hots' },
    { id: 3, title: 'News' },
    { id: 4, title: 'Activities' },
];

export var sampleUser = {
    pk: 1,
    name: 'amdigbari',
    followersCount: 85,
    followingsCount: 69,
    postsCount: 125,
    avatar: image,
    bio: 'Fuck You All',
    posts: [
        { ...samplePost, pk: 1 },
        { ...samplePost, pk: 2 },
        { ...samplePost, pk: 3 },
        { ...samplePost, pk: 4 },
    ],
};

export var sampleChannel = {
    name: 'Sample Channel',
    logo: image,
    members: 85,
    postsCount: 25,
    pk: 1,
    description: 'Fuck this piece of shit.',
    admins: [
        {
            ...sampleUser,
            pk: 1,
        },
        {
            ...sampleUser,
            pk: 2,
        },
        {
            ...sampleUser,
            pk: 3,
        },
        {
            ...sampleUser,
            pk: 4,
        },
        {
            ...sampleUser,
            pk: 5,
        },
        {
            ...sampleUser,
            pk: 6,
        },
    ],
};

export var samplePost = {
    pk: 1,
    image,
    caption:
        'اغلب افراد تمایل دارند جملات آموزنده و فلسفی را سرلوحه زندگی خود قرار دارند زیرا این جملات دارای مفهومی هستند که راه درست زندگی کردن را به افراد نشان می دهند و با کمی دقت و توجه به این جملات می توان تجربه های خوبی را از آن ها آموخت. در ادامه متن فلسفی بلند با انواع جملات پرمحتوا و دلنشین را مطالعه خواهید کرد.',
    channel: sampleChannel,
    author: {
        avatar: image,
        name: 'amdigbari',
    },
    score: 10,
    userScore: 1,
    date: 'همین الان:/',
    comments: [
        {
            pk: 1,
            author: sampleUser,
            date: 'دیروز',

            text:
                'افراد تمایل دارند جملات آموزنده و فلسفی را سرلوحه زندگی خود قرار دارند زیرا این جملات دارای مفهومی هستند که راه درست زندگی کردن را به افراد نشان می دهند و با کمی دقت و توجه به این جملات می توان تجربه های خوبی را از آن ها آموخت. در ادامه متن فلسفی بلند با انواع جملات پرمحتوا و دلنشین را مطالعه خواهید کرد.',
            replies: [
                {
                    pk: 2,
                    author: {
                        avatar: image,
                        name: 'amdigbari',
                    },
                    date: 'دیروز',

                    text:
                        'افراد تمایل دارند جملات آموزنده و فلسفی را سرلوحه زندگی خود قرار دارند زیرا این جملات دارای مفهومی هستند که راه درست زندگی کردن را به افراد نشان می دهند و با کمی دقت و توجه به این جملات می توان تجربه های خوبی را از آن ها آموخت. در ادامه متن فلسفی بلند با انواع جملات پرمحتوا و دلنشین را مطالعه خواهید کرد.',
                    replies: [],
                },
            ],
        },
    ],
};

export var samplePostNotification = {
    pk: 1,
    user: sampleUser,
    post: samplePost,
    like: false,
};

export var sampleFollowNotification = {
    pk: 10,
    user: sampleUser,
};
