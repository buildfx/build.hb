App = Ember.Application.create();

App.Book = Ember.Object.extend({
  author: null,
  quote: null,
  title: null
});

App.stateManager = Ember.StateManager.create({

  gotoStart: function() {
    this.goToState('start');
  },
  
  gotoAuthor: function() {
    this.goToState('author');
  },

  currentBook: App.Book.create({
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    quote: "They are in you and me; they created us, body and mind; and their preservation is the ultimate rationale for our existence. They have come a long way, those replicators. Now they go by the name of genes, and we are their survival machines.",
    authorBio: "Dawkins came to prominence with his 1976 book The Selfish Gene, which popularised the gene-centered view of evolution and introduced the term meme. In 1982 he introduced an influential concept into evolutionary biology, presented in his book The Extended Phenotype, that the phenotypic effects of a gene are not necessarily limited to an organism's body, but can stretch far into the environment, including the bodies of other organisms."
  }),

  start: Ember.ViewState.create({
    view: Ember.View.create({
      templateName: 'templates/home.handlebars'
    })
  }),

  author: Ember.ViewState.create({
    view: Ember.View.create({
      templateName: 'templates/author.handlebars'
    })
  })

});


SC.routes.add('', App.stateManager, 'gotoStart');
SC.routes.add('author', App.stateManager, 'gotoAuthor');
