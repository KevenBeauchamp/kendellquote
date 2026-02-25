import { useEffect, useState } from "react"
import { getFavorites, saveFavorites } from "./util/favorites";
import imageOflove from "./assets/love.jfif";
import imageOffaith from "./assets/faith.jfif";
import imageOfhappiness from "./assets/happiness.png";
import imageOfhumor from "./assets/humor.avif";
import imageOfinspirational from "./assets/inspirational.jpg";
import imageOfrelationship from "./assets/relationship.jpg";
import imageOfsuccess from "./assets/success.webp";
import imageRandom from "./assets/random2.jpg"
export default function Quotegenerator(params) {
  
    const [darkbutton,setDarkMode] = useState(false);
    const [favorites, setFavorites] = useState(getFavorites());
    const [quote_data, setQuote] = useState(false);
    const [quote_day, setQuoteOfTheDay] = useState(false);
    const [selectCategory, setCategory] = useState("");
    let [imageName, setimageName] = useState("");
    const [reload, setReload] = useState(0);
    const categories = ["inspirational", "relationships","love","faith","humor","success","happiness","random"];
    const imageBack = [imageOfinspirational,imageOfrelationship,imageOflove,imageOffaith,imageOfhumor,imageOfsuccess,imageOfhappiness,imageRandom];
    const addFavorite = () => {
            console.log(favorites)
            console.log(quote_data)

    if (!favorites.find((f) => f.content === quote_data.content)) {
      setFavorites([...favorites, quote_data]);
      console.log("enter")
    }
  };
   const addFavorites = () => {
    const exists = favorites.some(
    f => f.content === quote_data.content && f.author === quote_data.author
  );

  if (exists) return;

  const updated = [...favorites, { quote_data }];
  setFavorites(updated);
    
  };

  // const removeFavorite = (id) => {
  //   setFavorites(favorites.filter((_,i) => i !== id));
  // };
const removeFavorite = (index) => {
  setFavorites(prev =>
    prev.filter((_, i) => i !== index)
  );
};
  const copyQuote = () => {
    navigator.clipboard.writeText(`${quote_data.content} — ${quote_data.author}`);
  };

  const generateQuotes = async(selectCategory = " ")=>{
        // if (selectCategory == "random") return selectCategory == "";
        // if(typeof (selectCategory) === "object") return selectCategory == " "
        
        let options = {
            method: 'GET',
            headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY,}
          }
          console.log(selectCategory)
          let url;
            // const  url = `https://api.api-ninjas.com/v1/quotes?category=${selectCategory}`;
            //  const url = `https://api.api-ninjas.com/v2/randomquotes?category=${selectCategory}`;
              const urlrelationship = `https://api.api-ninjas.com/v2/randomquotes?categories=relationships`;
              const urllove = `https://api.api-ninjas.com/v2/randomquotes?categories=love`;
              const urlfaith = `https://api.api-ninjas.com/v2/randomquotes?categories=faith`;
               const urlhappiness = `https://api.api-ninjas.com/v2/randomquotes?categories=happiness`;
              const urlhumor = `https://api.api-ninjas.com/v2/randomquotes?categories=humor`;
              const urlinspirational = `https://api.api-ninjas.com/v2/randomquotes?categories=inspirational`;
              const urlsuccess = `https://api.api-ninjas.com/v2/randomquotes?categories=success`;
              switch (selectCategory) {
                case "love":
                  url = urllove
                  // setimageName(imageBack[2])
                  break;
                   case "faith":
                  url = urlfaith
                  // setimageName(imageBack[3])
                  break;
                   case "relationships":
                  url = urlrelationship
                  // setimageName(imageBack[1])
                  break;
                   case "inspirational":
                  url = urlinspirational
                  // setimageName(imageBack[0])
                  break;
                   case "humor":
                  url = urlhumor
                  // setimageName(imageBack[4])
                  break;
                   case "success":
                  url = urlsuccess
                  // setimageName(imageBack[5])
                  break;
                 case "happiness":
                  url = urlhappiness
                  // setimageName(imageBack[6])
                  break;
                default:
                  url = `https://api.api-ninjas.com/v2/randomquotes?category=`;
                  // setimageName(imageBack[7])
                  break;
              }
          console.log(imageName)
          fetch(url,options)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                  console.log("data",data)
                //   console.log(data[0])
                  setQuote({
                    content: data[0].quote,
                    author: data[0].author,
                    category: data[0].category
                  })
                })
                .catch(err => {
                    console.log(`error ${err}`)
                }); 
    }
    const generateQuotesOfTheDay = async()=>{
            
        let options = {
            method: 'GET',
            headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY,}
          }
          
             const url = `https://api.api-ninjas.com/v2/quoteoftheday`;
          
          console.log(url)
          fetch(url,options)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                  console.log("data",data)
                //   console.log(data[0])
                  setQuoteOfTheDay({
                    content: data[0].quote,
                    author: data[0].author,
                    category: data[0].category
                  })
                })
                .catch(err => {
                    console.log(`error ${err}`)
                }); 
    }
    const shareQuote = () => {
  if (!quote_data) return;

  const text = `"${quote_data.quote}" — ${quote_data.author}`;

  if (navigator.share) {
    navigator.share({
      title: "Quote",
      text,
    });
  } else {
    alert("Sharing not supported on this browser");
  }
};
useEffect(() => {
  saveFavorites(favorites);
}, [favorites]);
     useEffect(() => {
    // fetchQuote();
    generateQuotes("");
    generateQuotesOfTheDay();
  }, []);
    return(
       
        <div className={`vw-100 vh-100   max-vh-100 ${darkbutton ? "bg-dark text-light" : "bg-light"}`}>
            {/* <div> */}
                <div className="d-flex justify-content-between align-items-center mb-4">
 
                      <h3 >Kendell Quote Generator</h3>
                      <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkbutton)}>{darkbutton?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
</svg>}</button>
                  
                </div>
            {/* </div> */}
            <div>
              {/* Categories */}
        <div className="mb-3 text-center">
          {categories.map((c,index) => (
            <button
              key={c}
              className={`btn me-2 ${
                selectCategory === c ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
            </div> 
            <div className="row"  style={{ width: '95%', height: "80%" }}>
                {/* favorite */}
                <div className="col-md-4 ml-2">
                    <div className={`card overflow-auto ${darkbutton && "bg-secondary text-light"}`} style={{ maxHeight: "80vh" }}>
                        <div className="card-body">
                            <h5 className="card-title">Favorites</h5>
                            {favorites.length === 0 && (
                            <p className="text-muted">No favorite yet</p>
                            )}
                            {favorites.map((f,index) => (
                            <div key={index} className="mb-3">
                                <small>{f.content}</small>
                                <div className="text-end">
                                <button
                                    className="btn btn-sm btn-outline-danger mt-1"
                                    onClick={() => removeFavorite(index)}
                                >
                                    Remove
                                </button>
                                </div>
                                <hr />
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Quote  */}
                <div className="col-md-8 vw-95 h-100">
                  <div className="m-auto w-75 h-75">                        
                        <div className={`card  m-auto modifpadding ${darkbutton && "bg-secondary text-light"}`}  style={{
    backgroundImage: `url("${imageName}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
                            <blockquote className="blockquote text-center">
                                <p className="fs-4">“{quote_data.content}”</p>
                                <footer className="blockquote-footer mt-2 ">
                                    <spam className={`${darkbutton && " text-light"}`} >{quote_data.author}</spam>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <button type="button" className="btn btn-primary" onClick={()=>generateQuotes(selectCategory)}>
                         New Quote
                        </button>
                        <button className="btn btn-danger" onClick={addFavorite}>
                            ❤️ Favorite
                        </button>
                        <button className="btn btn-secondary" onClick={copyQuote}>
                            📋 Copy
                        </button>
                        <button className="btn btn-outline-secondary" type="button"  onClick={shareQuote}>
                            🔗 Share
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Quote of the day
</button>
                    </div>
                    {/* Quote  */}
                    {/* <div className="mt-5">
                        <h2 className=" d-flex justify-content-center">Quote of the day</h2>
                        <div className={`card p-4 ${darkbutton && "bg-secondary text-light"}`}>
                            <blockquote className="blockquote text-center">
                                <p className="fs-4">“{quote_day.content}”</p>
                                <footer className="blockquote-footer mt-2">
                                  <spam className={`${darkbutton && " text-light"}`} >{quote_data.author}</spam> 
                                </footer>
                            </blockquote>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* <!-- Button trigger modal --> */}


{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered custom-modal">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Quote of the day</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p className="fs-4">“{quote_day.content}”</p>
                                {/* <footer className="blockquote-footer mt-2"> */}
                                  <spam className={`${darkbutton && " text-light"}`} >{quote_day.author}</spam> 
                                {/* </footer> */}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" class="btn btn-primary">Understood</button> */}
      </div>
    </div>
  </div>
</div>
            <div>
                 <footer className={ `text-center mt-4 small  fixed-bottom bg-dark text-white ${darkbutton && " bg-white text-muted"}`} >Powered By Kendell Tech</footer>
            </div>
        </div>
    )
}