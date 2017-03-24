
window.onload = function() {
    // Scrolling
    initSmoothScrolling();
    // Translation
    initTranslation();

    // Subscription
    var subscribeForm = document.forms.subscribeForm;
    var thankYou = document.querySelector('#thank-you p');

    subscribeForm.onsubmit = function(e){
        e.preventDefault();
        var email = subscribeForm.email.value;
        var url = 'https://api.mlab.com/api/1/databases/remame/collections/emails?apiKey=RqXWJCYd7LCFOyvtO_GB2H23xdSdv_nM';
        var json = JSON.stringify({
            email: email
        });

        /* ...Form Validation Code Goes Here... */

        if (email !== '') {
            var http = new XMLHttpRequest();
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            http.onload = function() {
                if (http.status === 200 && http.statusText === 'OK') {
                    thankYou.innerHTML = _('subscribe-success');
                    thankYou.classList.add('active');
                    subscribeForm.reset();
                } else {
                    thankYou.innerHTML = _('subscribe-failure');
                    thankYou.classList.add('active');
                }
            };
            http.send(json);
        } else {
            thankYou.innerHTML = _('subscribe-failure');
            thankYou.classList.add('active');
        }
    };

};

// Scrolling
function initSmoothScrolling() {
  var duration = 1000;

  var pageUrl = location.hash ?
    stripHash(location.href) :
    location.href;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  // function directLinkHijacking() {
  //   [].slice.call(document.querySelectorAll('a'))
  //     .filter(isInPageLink)
  //     .forEach(function(a) {
  //       a.addEventListener('click', onClick, false);
  //     });
  //
  //   function onClick(e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //
  //     jump(e.target.hash, {
  //       duration: duration,
  //     });
  //   }
  //
  // }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
      n.hash.length > 0 &&
      stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  // function isCssSmoothSCrollSupported() {
  //   return 'scrollBehavior' in document.documentElement.style;
  // }

  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
    opt.offset + document.querySelector(target).getBoundingClientRect().top :
    target,
    duration = typeof opt.duration === 'function' ?
    opt.duration(distance) :
    opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop);
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

// Translation
function _(str, locale) {
	locale = locale || _.defaultLocale;
	if (_.data.hasOwnProperty(locale) && typeof _.data[locale] == 'object') {
		if (_.data[locale].hasOwnProperty(str)) {
			return _.data[locale][str];
		}
	}
	return str;
}

_.defaultLocale = 'en';
_.data = {
    en: {
        'title': 'Remame - App for remembering names',
    	'h1': 'Forget people\'s names? – There is a solution!',
        'p1': 'Remame is an app that will help you remember names of different people you just met. Taking a note about a person and remembering names has never been so easy.',
        'btn1': 'Subscribe',
        'btn3': 'Download',
        'h2-1': 'Simplicity',
        'p2': 'Just launch the app and type a name or ask your new friend to type his name right in the app. Also there is an option to write a note about the person to recognize him from others. Remame will try to help you to fill in the location of your meeting. If something is missing you can just fix it. So location and time of your meeting will be added automatically.',
        'h2-2': 'Import to contacts',
        'p3': 'One tap - and your new friends are in the Contacts app.',
        'h2-3': 'Today widget and 3D Touch support',
        'p4': 'The app provides a widget in Today view. So the new people\'s names are always at hand. You will never forget someone\'s name. Also it supports 3D Touch that\'s why you can make new friends as fast as possible.',
        'h2-4': 'Cool iMessages stickers',
        'p5': 'A few iMessages stickers help you to express your emotions and feelings.',
        'h3': 'Get In',
        'p6': 'The app is on the App Store now. Leave your email to get notified about new features.',
        'email': 'Type your email..',
        'btn2': 'Subscribe',
        'subscribe-success': 'Thank you a lot! 🎉 New features are coming.',
        'subscribe-failure': 'Oops.. Something goes wrong. 😯 Let\'s try one more time!',
        'sm1': 'Have something to say? - Let\'s talk! ',
        'sm2': 'or simply help us spread the word. ',
        'twitter': 'https://twitter.com/intent/tweet?text=Take%20a%20look%20at%20Remame%20app%20to%20better%20remember%20people%27s%20names%21&url=http%3A%2F%2Fremame%2Eus',
        'telegram': 'https://telegram.me/share/url?url=http%3A%2F%2Fremame%2Eus&text=Take%20a%20look%20at%20Remame%20app%20to%20better%20remember%20people%27s%20names%21'
    }
};

_.registerLocale = function registerLocale(locale, data) {
	if (!_.data.hasOwnProperty(locale)) {
		_.data[locale] = {};
	}
	for (var str in data) {
		if (data.hasOwnProperty(str)) {
			_.data[locale][str] = data[str];
		}
	}
};

_.registerLocale('ru', {
	'title': 'Remame – Приложение для запоминания имен',
    'h1': 'Забываете имена людей? – Есть решение!',
    'p1': 'Remame – это приложение, которое поможет вам запоминать имена разных людей, с которыми вы только что познакомились. Добавление заметки о человеке и запоминание имен никогда не было таким простым.',
    'btn1': 'Подписаться',
    'btn3': 'Скачать',
    'h2-1': 'Простота',
    'p2': 'Просто запустите приложение и введите имя или попросить своего нового друга ввести свое имя прямо в приложении. Также есть возможность написать заметку о человеке, чтобы отличить его от других. Место и время вашего знакомства будут добавлены автоматически.',
    'h2-2': 'Сохранение в Контакты',
    'p3': 'Один клик – и ваши новые друзья в приложении Контакты.',
    'h2-3': 'Виджет "Сегодня" и 3D Touch',
    'p4': 'Приложение предоставляет виджет в центре уведомлений. Поэтому имена новых людей всегда под рукой. Вы никогда не забудете чье-то имя. Кроме того, приложение поддерживает 3D Touch, так что вы можете заводить новых друзей максимально быстро.',
    'h2-4': 'Крутые стикеры Remame',
    'p5': 'Приложение также дает вам несколько удивительных наклеек для простоты общения в iMessages.',
    'h3': 'Присоединяйтесь',
    'email': 'Введите ваш емейл..',
    'p6': 'Приложение уже доступно в App Store. Оставьте свой емейл, чтобы получать уведомления о новых функциях.',
    'btn2': 'Подписаться',
    'subscribe-success': 'Спасибо большое! 🎉 Новые функции на подходе.',
    'subscribe-failure': 'Упс.. Что-то пошло не так. 😯 Давайте попробуем ещё раз!',
    'sm1': 'Есть что сказать? – Давайте обсудим! ',
    'sm2': 'или просто расскажите о нас миру. ',
    'twitter': 'https://twitter.com/intent/tweet?text=Взгляни%20на%20приложение%20Remame%2C%20чтобы%20лучше%20запоминать%20имена%20людей%21&url=http%3A%2F%2Fremame%2Eus',
    'telegram': 'https://telegram.me/share/url?url=http%3A%2F%2Fremame%2Eus&text=Взгляни%20на%20приложение%20Remame%2C%20чтобы%20лучше%20запоминать%20имена%20людей%21'
});

_.registerLocale('es', {
	'title': 'Remame – Aplicación para recordar los nombres',
    'h1': '¿Olvidar los nombres de las personas? - ¡Hay una solución!',
    'p1': 'Remame – una aplicación que te ayudará a recordar los nombres de las diferentes personas que acabas de conocer. Tomar una nota sobre una persona y recordar nombres nunca ha sido tan fácil.',
    'btn1': 'Suscribir',
    'btn3': 'Descargar',
    'h2-1': 'Sencillez',
    'p2': 'Simplemente inicie la aplicación y escriba un nombre o pídale a su nuevo amigo que escriba su nombre justo en la aplicación. También hay una opción para escribir una nota sobre la persona para reconocerlo de los demás. La ubicación y la hora de la reunión se agregarán automáticamente.',
    'h2-2': 'Importación de Contactos',
    'p3': 'Un toque - y sus nuevos amigos están en la aplicación Contactos.',
    'h2-3': 'Hoy widget y 3D Touch',
    'p4': 'La aplicación proporciona un widget en la vista de Hoy. Así que los nombres de la nueva gente están siempre a mano. Nunca olvidarás el nombre de alguien. También es compatible con 3D Touch por eso puede hacer nuevos amigos lo más rápido posible.',
    'h2-4': 'iMessages pegatinas buenas',
    'p5': 'La aplicación también le da un montón de impresionantes pegatinas para expresar algunos sentimientos en iMessages.',
    'h3': 'Únete a nosotros',
    'email': 'Escriba su correo electrónico..',
    'p6': 'La aplicación está en la App Store. Deje su email para recibir notificaciones sobre las nuevas características..',
    'btn2': 'Suscribir',
    'subscribe-success': 'Muchas gracias! 🎉 Remame estará contigo pronto.',
    'subscribe-failure': 'Vaya.. Algo va mal. 😯 Vamos a intentarlo una vez más!',
    'sm1': '¿Tener algo que decir? - ¡Hablemos! ',
    'sm2': 'o simplemente ayudar a contar acerca de nosotros al mundo. ',
    'twitter': 'https://twitter.com/intent/tweet?text=Descarga%20de%20aplicación%20Remame%20para%20recordar%20nombres%20de%20las%20personas%21&url=http%3A%2F%2Fremame%2Eus',
    'telegram': 'https://telegram.me/share/url?url=http%3A%2F%2Fremame%2Eus&text=Descarga%20de%20aplicación%20Remame%20para%20recordar%20nombres%20de%20las%20personas%21&'
});

function initTranslation() {
    var ruButton = document.getElementById('ru');
    var enButton = document.getElementById('en');
    var esButton = document.getElementById('es');

    function changeLang(lang) {
        _.defaultLocale = lang;

        document.title = _('title');
        document.getElementById('h1').innerHTML = _('h1');
        document.getElementById('p1').innerHTML = _('p1');
        document.getElementById('btn1').innerHTML = _('btn1');
        document.getElementById('btn3').innerHTML = _('btn3');
        document.getElementById('h2-1').innerHTML = _('h2-1');
        document.getElementById('p2').innerHTML = _('p2');
        document.getElementById('h2-2').innerHTML = _('h2-2');
        document.getElementById('p3').innerHTML = _('p3');
        document.getElementById('h2-3').innerHTML = _('h2-3');
        document.getElementById('p4').innerHTML = _('p4');
        document.getElementById('h2-4').innerHTML = _('h2-4');
        document.getElementById('p5').innerHTML = _('p5');
        document.getElementById('h3').innerHTML = _('h3');
        document.getElementById('p6').innerHTML = _('p6');
        document.getElementById('email').placeholder = _('email');
        document.getElementById('btn2').innerHTML = _('btn2');
        document.getElementById('sm1').innerHTML = _('sm1');
        document.getElementById('sm2').innerHTML = _('sm2');

        document.getElementById('twitter').href = _('twitter');
        document.getElementById('telegram').href = _('telegram');
    }

    ruButton.addEventListener('click', function(e) {
        e.preventDefault();
        changeLang('ru');
        this.classList.add('active');
        getSiblings(this).forEach(function(el) {
            el.classList.remove('active');
        });
    });

    enButton.addEventListener('click', function(e) {
        e.preventDefault();
        changeLang('en');
        this.classList.add('active');
        getSiblings(this).forEach(function(el) {
            el.classList.remove('active');
        });
    });

    esButton.addEventListener('click', function(e) {
        e.preventDefault();
        changeLang('es');
        this.classList.add('active');
        getSiblings(this).forEach(function(el) {
            el.classList.remove('active');
        });
    });
}

function getSiblings(elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    for ( ; sibling; sibling = sibling.nextSibling ) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
    }
    return siblings;
}
