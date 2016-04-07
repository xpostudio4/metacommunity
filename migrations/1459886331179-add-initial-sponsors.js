'use strict'
const coroutine = require('co');
const Sponsor = require('../db').sponsors;
const data = [
  {
    name: 'Codemera',
    description: 'We are a team of web makers passionate about all the scalable, amazing, meaningful things you can do with the web',
    website: 'http://codemera.com/',
    logo: './img/sponsors/codemera.png',
    created: new Date('2013-09-25T19:00:00.001Z'),
  },
  {
    name: 'Codetiger',
    description: "We're a team of web aficionados that write, think and dream about code. We love what we do and we're in the business of making ideas a reality.",
    website: 'http://codetiger.co/',
    logo: './img/sponsors/codetiger.png',
    created: new Date('2016-04-05T19:00:00.001Z'),
  },
  {
    name: 'INTEC',
    description: "INSTITUTO TECNOLÓGICO DE SANTO DOMINGO",
    website: 'https://www.intec.edu.do/',
    logo: './img/sponsors/intec.png',
    created: new Date('2016-04-05T19:00:00.001Z'),
  },
  {
    name: 'Marcos',
    description: "Somos un equipo de gente apasionada cuya meta es mejorar la vida de cada uno a través de productos disruptivos. Construimos grandes productos para solucionar sus problemas de negocio.",
    website: 'https://marcos.do/',
    logo: './img/sponsors/marcosdo.png',
    created: new Date('2016-04-05T19:00:00.001Z'),
  },
  {
    name: 'Megsoft Consulting',
    description: "We are a team of tech-savvy individuals with a passion for mobile devices and what they empower you to do. Our primary focus is building native cross-platform applications for iOS, Android and Windows Phone.",
    website: 'http://megsoftconsulting.com/',
    logo: './img/sponsors/megsoft.png',
    created: new Date('2016-04-05T19:00:00.001Z'),
  },
  {
    name: 'Pixel Perfect Tree',
    description: "We make meaningful web experiences powered by cutting edge technologies for innovative companies and startups.",
    website: 'http://www.pixelpt.com/',
    logo: './img/sponsors/pixelperfecttree.jpg',
    created: new Date('2016-04-05T19:00:00.001Z'),
  },
  {
    name: 'Python Software Foundation',
    description: "The mission of the Python Software Foundation is to promote, protect, and advance the Python programming language, and to support and facilitate the growth of a diverse and international community of Python programmers.",
    website: 'https://www.python.org/psf/',
    logo: './img/sponsors/psf.png',
    created: new Date('2016-04-05T19:00:00.001Z'),
  }
];
exports.up = function(next) {
  coroutine(function* up() {
    yield data
    .map(d => Sponsor.create(d));
  })
  .catch(onError)
  .then(next);
};

exports.down = function(next) {
  coroutine(function* down() {
    yield data
    .map(d => d.name)
    .map(n => Sponsor.remove({name: n}));
  })
  .catch(onError)
  .then(next);
};

function onError(error) {
  console.error(error);
}
