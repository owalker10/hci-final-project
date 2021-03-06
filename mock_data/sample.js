const msInDay = 24*60*60*1000;
module.exports = {
    users: [
        {
            username: 'user',
            name: 'Johnny User',
            image: 'https://randomuser.me/api/portraits/men/66.jpg',
            points: 102,
        },
        {
            username: 'fbernard',
            name: 'Fanny Bernard',
            image: 'https://randomuser.me/api/portraits/women/85.jpg',
            points: 102,
        },
        {
            username: 'mperrin',
            name: 'Marisa Perrin',
            image: 'https://randomuser.me/api/portraits/women/58.jpg',
            points: 4,
        },
        {
            username: 'amartin',
            name: 'Alexander Martin',
            image: 'https://randomuser.me/api/portraits/men/44.jpg',
            points: 57,
        },
        {
            username: 'dlowe',
            name: 'Derek Lowe',
            image: 'https://randomuser.me/api/portraits/men/87.jpg',
            points: 18,
        },
        {
            username: 'gfoster',
            name: 'Grace Foster',
            image: 'https://randomuser.me/api/portraits/women/24.jpg',
            points: 189,
        },
    ],
    posts: [
        {
            id: "1TGPULyUULwjqr74BqABy6",
            title: "Scissors",
            created: Date.now(),
            username: 'gfoster',
            category: 'borrow',
            need_by: Date.now(),
            description: "Just need a pair of scissors for a class project, the sooner the better. Thanks!",
            points: 50,
            create_points: -10,
            // fulfilled_by: undefined,
            // fulfilled_date: undefined,
        },
        {
            id: "cAVSX7Ks187niBzzh5DRDz",
            title: "Oatmeal Raisin Cookies",
            created: Date.now() - 5*msInDay,
            username: 'dlowe',
            category: 'giveaway',
            need_by: 'anytime',
            description: "my mom made me take these from home but I hate raisins lol",
            points: -10,
            // fulfilled_by: undefined,
            // fulfilled_date: undefined,
        },
        {
            id: "rSWUye43wvQA81cxoS5TPg",
            title: "Need printer!",
            created: Date.now() - 1*msInDay,
            username: 'amartin',
            category: 'favor',
            need_by: 'ASAP',
            description: "just need to print one b&w page on somebody\'s printer plz!",
            points: 50,
            create_points: -10,
            // fulfilled_by: undefined,
            // fulfilled_date: undefined,
        },
        {
            id: "gfaKZf2CkQDVBJ6DWr9FTJ",
            title: "Eggs",
            created: Date.now() - 20,
            username: 'fbernard',
            category: 'keep',
            need_by: Date.now() + msInDay,
            description: "just need to print one b&w page on somebody\'s printer plz!",
            points: 50,
            create_points: -10,
            // fulfilled_by: undefined,
            // fulfilled_date: undefined,
        },
        {
            id: "k8jgbZs5zFpdSecD7ojtsG",
            title: "Size 10 dress shoes",
            created: Date.now() - 25,
            username: 'user',
            category: 'borrow',
            need_by: Date.now() + 3*msInDay,
            description: "Need a pair of men???s dress shoes, size 10. No color preference. Will return next day.",
            points: 50,
            create_points: -10,
            // fulfilled_by: undefined,
            // fulfilled_date: undefined,
        },
        {
            id: "mY58vQTsiTwpuoZtXzgLYK",
            title: "Green Sharpie",
            created: Date.now() - 10*msInDay,
            username: 'user',
            category: 'borrow',
            need_by: Date.now() - 8*msInDay,
            description: "Need a pair of men???s dress shoes, size 10. No color preference. Will return next day.",
            points: 50,
            create_points: -10,
            fulfilled_by: 'dlowe',
            fulfilled_date: Date.now() - 8*msInDay,
        },
        {
            id: "owdqVXGeSakjuB3sH6Kvpy",
            title: "Whataburger coupons",
            created: Date.now() - 11*msInDay,
            username: 'amartin',
            category: 'giveaway',
            need_by: Date.now() + 14*msInDay,
            description: "Got a bunch of these at an event.",
            points: -10,
            fulfilled_by: 'user',
            fulfilled_date: Date.now() - 11*msInDay,
        },
    ]
}