const searchTerm1 = document.querySelector('#searchterm1');
const searchTerm2 = document.querySelector('#searchterm2');

const termKey1 = "cat";
const termKey2 = "";

const storedTerm1 = localStorage.getItem(termKey1);
const storedTerm2 = localStorage.getItem(termKey2);

if (storedTerm1) {
    searchTerm1.value = storedTerm1;
}else{
    searchTerm1.value = "cat";
}

if (storedTerm2) {
    searchTerm2.value = storedTerm2;
}else{
    searchTerm2.value = "";
}

searchTerm1.onchange = e=>{ localStorage.setItem(termKey1, e.target.value); };
searchTerm2.onchange = e=>{ localStorage.setItem(termKey2, e.target.value); };