function create_list(){
        div1 = document.createElement("div");
        div1.className = "col-md-6";
        div2 = document.createElement("div");
        div2.className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        div1.appendChild(div2);
        div3_1 = document.createElement("div");
        div3_1.className = "col p-4 d-flex flex-column position-static"; //////
        strong1 = document.createElement("strong");
        strong1.className = "d-inline-block mb-2 text-primary";
        strong1.innerText = "World";

        h1 = document.createElement('h3');
        h1.className = "mb-0";
        h1.innerText ="Featured post";
        div3_1_1 = document.createElement("div");
        div3_1_1.className = "mb-1 text-muted";
        div3_1_1.innerText = "Nov 12";
        p1 = document.createElement("p");
        p1.className = "card-text mb-auto";
        p1.innerText = "This is a wider card with supporting text below as a natural lead-in to additional content.";
        a1 = document.createElement("a");
        a1.href="#";
        a1.className = "stretched-link";
        a1.innerText = "Continue reading";
        div3_1.appendChild(strong1);
        div3_1.appendChild(h1);
        div3_1.appendChild(div3_1_1);
        div3_1.appendChild(p1);
        div3_1.appendChild(a1);
        div3_2 = document.createElement("div");
        div3_2.className = "col-auto d-none d-lg-block";
        div3_2.style.backgroundColor = "red";
        div3_2.style.width ="200px";
        div3_2.style.height = "250px";
        div2.appendChild(div3_1);
        div2.appendChild(div3_2);
    document.getElementById("rowb2").appendChild(div1);
}