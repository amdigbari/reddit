import image from '../assets/images/test_profile.jpg';

export const navigationTabs = [
    { id: 1, title: 'Following' },
    { id: 2, title: 'Hots' },
    { id: 3, title: 'News' },
    { id: 4, title: 'Activities' },
];

export var sampleUser = {
    pk: 1,
    username: 'fuck you',
    name: 'amdigbari',
    email: 'amirmahdidigbari@yahoo.com',
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
    caption: `Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "Teh monks were not to blame, in any case," he reflceted, on the steps. "And if they're decent people here (and the Father Superior, I understand, is a nobleman) why not be friendly and courteous withthem? I won't argue, I'll fall in with everything, I'll win them by politness, and show them that I've nothing to do with that Aesop, thta buffoon, that Pierrot, and have merely been takken in over this affair, just as they have."`,
    channel: sampleChannel,
    author: {
        avatar: image,
        name: 'amdigbari',
    },
    score: 10,
    userScore: 1,
    date: 'just now:/',
    comments: [
        {
            pk: 1,
            author: sampleUser,
            date: 'yesterday',

            text: `Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "Teh monks were not to blame, in any case," he reflceted, on the steps. "And if they're decent people here (and the Father Superior, I understand, is a nobleman) why not be friendly and courteous withthem? I won't argue, I'll fall in with everything, I'll win them by politness, and show them that I've nothing to do with that Aesop, thta buffoon, that Pierrot, and have merely been takken in over this affair, just as they have."`,
            replies: [
                {
                    pk: 2,
                    author: {
                        avatar: image,
                        name: 'amdigbari',
                    },
                    date: 'yesterday',

                    text: `Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "Teh monks were not to blame, in any case," he reflceted, on the steps. "And if they're decent people here (and the Father Superior, I understand, is a nobleman) why not be friendly and courteous withthem? I won't argue, I'll fall in with everything, I'll win them by politness, and show them that I've nothing to do with that Aesop, thta buffoon, that Pierrot, and have merely been takken in over this affair, just as they have."`,
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
