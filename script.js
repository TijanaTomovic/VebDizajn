function fetchSynonyms() {
    const word = document.getElementById('wordInput').value;
    const url = `https://www.synonyms.com/synonyms_api.php?term=${word}`;

    axios.get(url)
        .then(response => {
            const synonyms = response.data.synonyms;
            const list = document.getElementById('synonymList');
            list.innerHTML = ''; // Čistimo listu pre prikaza novih sinonima

            synonyms.forEach(synonym => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = synonym;
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching synonyms:', error);
        });
}

function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name.length < 3) {
        alert("Ime mora imati više od 3 karaktera.");
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert("Unesite validnu email adresu.");
        return;
    }
    if (message.trim() === '') {
        alert("Poruka ne sme biti prazna.");
        return;
    }

    window.location.href = 'success.html';  // Nakon validacije preusmerava na success stranicu
}







async function fetchSynonyms() {
    const word = document.getElementById('wordInput').value.trim();

    if (!word) {
        alert('Molimo unesite reč.');
        return;
    }

    try {
        // Pošaljite GET zahtev Datamuse API-ju sa rečju kao parametrom
        const response = await axios.get('https://api.datamuse.com/words', {
            params: {
                rel_syn: word
            }
        });
        
        // Ispis odgovora u konzolu za debugging
        console.log('API odgovor:', response.data);

        // Proverite da li API vraća sinonime
        const synonyms = response.data;

        // Prikaz rezultata
        const synonymList = document.getElementById('synonymList');
        synonymList.innerHTML = ''; // Očisti prethodne rezultate

        if (Array.isArray(synonyms) && synonyms.length > 0) {
            synonyms.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = item.word;
                synonymList.appendChild(listItem);
            });
        } else {
            synonymList.innerHTML = '<li class="list-group-item">Nema sinonima za ovu reč.</li>';
        }
    } catch (error) {
        console.error('Greška prilikom preuzimanja sinonima:', error);
        alert('Došlo je do greške prilikom preuzimanja sinonima. Pokušajte ponovo kasnije.');
    }
}


function validateForm(event) {
    event.preventDefault(); // Spreči da se forma pošalje automatski
    
    // Uzmite vrednosti iz polja
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Selektujte elemente za prikaz poruka
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    // Uklonite prethodne poruke
    clearMessages();

    let isValid = true;

    // Validacija imena
    if (name.length < 3) {
        displayError(nameField, 'Ime mora biti duže od 3 karaktera.');
        isValid = false;
    }

    // Validacija emaila
    if (!validateEmail(email)) {
        displayError(emailField, 'Email mora biti ispravan.');
        isValid = false;
    }

    // Validacija poruke
    if (message.length === 0) {
        displayError(messageField, 'Poruka ne sme biti prazna.');
        isValid = false;
    }

    if (isValid) {
        // Ako su svi uslovi zadovoljeni, preusmerite korisnika na stranicu sa obaveštenjem
        window.location.href = 'success.html';
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function displayError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'invalid-feedback';
    errorElement.textContent = message;
    field.classList.add('is-invalid');
    field.parentElement.appendChild(errorElement);
}

function clearMessages() {
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid');
        const error = input.parentElement.querySelector('.invalid-feedback');
        if (error) {
            error.remove();
        }
    });
}

const translations = {
    en: {
        "page-title": "Home Page",
        "welcome-title": "Welcome",
        "welcome-message": "Discover synonyms easily and improve your vocabulary.",
        "site-purpose": "Our site provides an easy way to find synonyms for any word, helping you improve your writing and expand your vocabulary.",
        "footer-text": "&copy; 2024 Web Design. Tijana Tomović.",
        "nav-home": "Home",
        "nav-about": "About Us",
        "nav-services": "Services",
        "nav-contact": "Contact",
        "nav-synonyms": "Synonyms",
        "title": "Homepage",
        "site-name": "SMasters",
        "nav-home": "Home",
        "nav-about": "About Us",
        "nav-services": "Services",
        "nav-contact": "Contact",
        "nav-synonyms": "Synonyms",
        
    },
    sr: {
        "page-title": "Početna stranica",
        "welcome-title": "Dobrodošli",
        "welcome-message": "Otkrijte sinonime lako i poboljšajte svoj vokabular.",
        "site-purpose": "Naš sajt pruža jednostavan način za pronalaženje sinonima za bilo koju reč, pomažući vam da poboljšate svoje pisanje i proširite vokabular.",
        "footer-text": "&copy; 2024 Web dizajn. Tijana Tomović.",
        "nav-home": "Početna",
        "nav-about": "O nama",
        "nav-services": "Usluge",
        "nav-contact": "Kontakt",
        "nav-synonyms": "Sinonimi",
        
    }
};

let currentLanguage = 'sr';

function applyTranslations() {
    document.querySelectorAll('[id]').forEach(element => {
        const key = element.id;
        if (translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }
    });

    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }
    });
    
}

function changeLanguage(language) {
    if (translations[language]) {
        currentLanguage = language;
        applyTranslations();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lang-en')?.addEventListener('click', () => changeLanguage('en'));
    document.getElementById('lang-sr')?.addEventListener('click', () => changeLanguage('sr'));

    applyTranslations();
});



