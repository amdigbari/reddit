import image from '../assets/images/test_profile.jpg';

export const navigationTabs = [
    { id: 1, title: 'Following' },
    { id: 2, title: 'Hots' },
    { id: 3, title: 'News' },
    { id: 4, title: 'Activities' },
];

export const sampleChannel = {
    name: 'Sample Channel',
    logo: image,
    members: 85,
    postsCount: 25,
    pk: 1,
    description: 'Fuck this piece of shit.',
    admins: [
        {
            avatar: image,
            name: 'amdigbari',
            pk: 1,
        },
        {
            avatar: image,
            name: 'amdigbari',
            pk: 2,
        },
        {
            avatar: image,
            name: 'amdigbari',
            pk: 3,
        },
        {
            avatar: image,
            name: 'amdigbari',
            pk: 4,
        },
        {
            avatar: image,
            name: 'amdigbari',
            pk: 5,
        },
        {
            avatar: image,
            name: 'amdigbari',
            pk: 6,
        },
    ],
};

export const samplePost = {
    pk: 1,
    image,
    caption:
        'اغلب افراد تمایل دارند جملات آموزنده و فلسفی را سرلوحه زندگی خود قرار دارند زیرا این جملات دارای مفهومی هستند که راه درست زندگی کردن را به افراد نشان می دهند و با کمی دقت و توجه به این جملات می توان تجربه های خوبی را از آن ها آموخت. در ادامه متن فلسفی بلند با انواع جملات پرمحتوا و دلنشین را مطالعه خواهید کرد.',
    channel: {
        name: 'sample channel',
        logo: image,
    },
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
            author: {
                avatar: image,
                name: 'amdigbari',
            },
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
