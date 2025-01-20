import React, { useEffect, useState } from "react";
import { isElement } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";

const UseEffectExample = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState();
    const navigate = useNavigate();
    const isSetted =  JSON?.parse(localStorage.getItem("images"))
    
    const getData = async () => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const result = await res.json();
            if (result) {
                const postsWithImages = result.map((item) => ({
                    ...item,
                    image: `https://picsum.photos/id/${item.id}/300/200`,
                    caption: "",
                }));
                setData(postsWithImages);
                setFilteredData(postsWithImages);
                (isSetted?.length === 0 || !isSetted) && localStorage.setItem("images",JSON?.stringify(postsWithImages))
            } else {
                console.error("Response error");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
console.log("LOcal",isSetted)
 
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
        localStorage.setItem("images",JSON?.stringify(filtered))
    };



    const goToAddCaptionPage = (id) => {
       ( isSetted?.length === 0 || !isSetted) && localStorage.setItem("images",JSON?.stringify(filteredData))
        navigate(`/add-caption/${id}`);
    };

   
    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" ,minHeight:"100vh" , background:"url(https://as1.ftcdn.net/v2/jpg/09/58/77/80/1000_F_958778095_xtNgOHfkqIOz33CeCN0wVPX8Fkh9QgAj.jpg)" , backgroundRepeat:"no-repeat" ,backgroundSize:"cover" }}>
            <div style={{backgroundColor:"white" , padding:"5px", borderRadius:"10px", marginBottom:"15px" ,width:"fit-content"}}><div
            style={{display:"flex",gap:"5px"}}>
                <div style={{fontWeight:"600"}}>Name :</div>
                <div>Shreyansh Tripathi</div>
            </div>
            <div  style={{display:"flex",gap:"5px"}}>
                <div  style={{fontWeight:"600"}}>Email :</div>
                <div>tshreyansh36@gmail.com</div>
            </div>
            </div>
            {/* <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Images List</h1> */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={handleSearch}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        marginRight: "10px",
                    }}
                />
            </div>

            <div style={{ display: "grid",gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center" }}>
                {isSetted?.length !== 0 && isSetted ?  isSetted?.map((item,index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                               display:"flex",
                               flexDirection:"column",
                               justifyContent:"space-between",
                                padding: "15px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                backgroundColor: "#fff",
                            }}
                        >
                            <img
                                src={item.image}
                                alt={`Img`}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    marginBottom: "10px",
                                }}
                            />
                           {/* {item.caption && <p style={{ fontSize: "14px",marginTop:0, marginBottom:'2px', color: "#777" }}>{item.caption}</p>} */}
                            <button
                                onClick={() => goToAddCaptionPage(item.id)}
                                style={{
                                    padding: "10px 15px",
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Add/Edit Caption
                            </button>
                        </div>
                    )) : filteredData.length > 0 ? (
                    filteredData?.map((item,index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                               
                                padding: "15px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                backgroundColor: "#fff",
                            }}
                        >
                            <img
                                src={item.image}
                                alt={`Img`}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    marginBottom: "10px",
                                }}
                            />
                            {/* <h3 style={{ fontSize: "18px", margin: "10px 0" }}>UserId: {item.userId}</h3>
                            <h4 style={{ fontSize: "16px", margin: "10px 0", color: "#555" }}>
                                Title: {item.title}
                            </h4> */}
                            {/* <p style={{ fontSize: "14px", color: "#777" }}>{item.body}</p> */}
                            <button
                                onClick={() => goToAddCaptionPage(item.id)}
                                style={{
                                    padding: "10px 15px",
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Add/Edit Caption
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", fontSize: "18px", color: "#777" }}>
                        <img alt="Image" style={{ textAlign:"center",borderRadius:"15px" ,width:"50vw" ,marginLeft:"25vw", height:"60vh"  }} src="https://imgs.search.brave.com/m77FuaDzybgqOkLr01VUTXhJzmK9SjPOnkOgWOF7N4s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC80MS82NS9u/by1kYXRhLWVtcHR5/LWZpbGUtZm9sZGVy/LW5vdC1mb3VuZC1p/bmZvcm1hdGlvbi12/ZWN0b3ItNDYzMzQx/NjUuanBn" />
                        <div style={{marginTop:"-30px",marginLeft:"25vw"}}>No Data found.</div>
                    </p>
                )}
            </div>
        </div>
    );
};

export default UseEffectExample;
