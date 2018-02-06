var Product = require('../models/products');
var mongoose = require('mongoose');

var product = [
  new Product({

    imagePath:'http://bit.ly/2tMBBTd',
    title:'Parsi Akuri',
    description:'This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri.',
    price:10

  }),
  new Product({

    imagePath:'http://bit.ly/2tMBBTd',
    title:'Milkshake',
    description:'This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri.',
    price:10

  })
  ,
  new Product({

    imagePath:'http://bit.ly/2tMBBTd',
    title:'Salad',
    description:'This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri.',
    price:10

  })
  ,
  new Product({

    imagePath:'http://bit.ly/2tMBBTd',
    title:'Cake',
    description:'This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri.',
    price:10

  })
  ,
  new Product({

    imagePath:'http://bit.ly/2tMBBTd',
    title:'Biscuits',
    description:'This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri.',
    price:10

  })
  ,
  new Product({

    imagePath:'http://bit.ly/2tMBBTd',
    title:'Chocolates',
    description:'This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri.',
    price:10

  })
  ,
  new Product({

    imagePath:'http://bit.ly/2tMBBTd',
    title:'Muffins',
    description:'This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri. This is a demo description for Parsi Akuri.',
    price:10

  })
];

var done = 0;

for (var i = 0; i < product.length; i++) {
  product[i].save(function(err, result){

    done++;
    if (done===product.length) {
      mongoose.disconnect();
    }

  });
}
