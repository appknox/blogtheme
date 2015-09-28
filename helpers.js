var hbs = require('express-hbs');
var api = require('./core/server/api');

module.exports = function(){  
    hbs.registerHelper('cond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
               case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
               case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });
    hbs.registerHelper('latestFeature', function (posts, options) {
        for (id in posts) {
            post = posts[id]
            if (post.featured == true) {
                return options.fn(post);
            }
        };
    });
    hbs.registerHelper('latestPost', function (posts, options) {
        console.log(posts);
        counter = 0;
        latestPost = [];
        for (id in posts) {
            latestPost.push(posts[id])
            counter = counter + 1;
            if (counter > 4) return options.fn(post);
        };
    });
    hbs.registerHelper('moreFeature', function (posts, options) {
        counter = 0;
        featured_post = [];
        for (id in posts) {
            if (counter > 4) break;
            if (posts[id].featured == true) {
                if (counter == 0) {
                    counter = counter + 1;
                    continue;
                }
                counter = counter + 1;
                featured_post.push(posts[id]);
            };
        };
        return options.fn(featured_post);
    });
};