exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('articles').insert({
          title: 'How to install Laravel Homestead | The Easy Way',
          body: '# Realtime Markdown Editor \n' +
                '### What is this? \n' +
                'Type your markdown into the box on the left and immediately ' +
                'see if on the box on the right. If you send a ' +
                'friend a link to a pad URL (other than the home page) ' +
                'you both can edit the document at the same time! \n' +
                '### How to use this? \n' +
                'Type anything after the slash in "https://realtimemarkdown.herokuapp.com/"' +
                'and just start creating markdown. If you don\'t ' +
                'feel typing in the address bar, ' +
                'feel free to go to one of these markdown pads: \n' +
                '- [https://realtimemarkdown.herokuapp.com/sample](https://realtimemarkdown.herokuapp.com/sample)\n' +
                '- [https://realtimemarkdown.herokuapp.com/my_project](https://realtimemarkdown.herokuapp.com/my_project)\n' +
                '- [https://realtimemarkdown.herokuapp.com/whatever](https://realtimemarkdown.herokuapp.com/whatever)\n' +
                '### How was this built?\n' +
                'This website uses the following to work:\n' +
                '- [Markdown](https://github.com/showdownjs/showdown) - Converts markdown text to beautiful HTML \n' +
                '- [ShareJS](http://sharejs.org/) - allows for realtime editing of this textbox \n' +
                '- [Node.js](https://nodejs.org/) - backend framework \n' +
                '- [Redis](http://redis.io/) - where we store our markdown documents \n' +
                '- [Twitter Bootstrap](http://getbootstrap.com/) - makes everything a little prettier \n'
        })
      ]);
    });
};
