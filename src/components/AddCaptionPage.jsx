import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddCaptionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         try {
    //             const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    //             const result = await res.json();
    //             if (result) {
    //                 setPost({
    //                     ...result,
    //                     image: `https://picsum.photos/200?random=${result.id}`,
    //                     caption: "",
    //                 });
    //             } else {
    //                 console.error("Post not found");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching post:", error);
    //         }
    //     };
    //     fetchPost();
    // }, [id]);

    const allImages = JSON.parse(localStorage.getItem("images"))
    useEffect(()=>{
        setPost(...allImages?.filter((item)=>(
             item?.id == id )))

    },[])
    const saveCaption = () => {
       const newImages  =  allImages?.map((item)=>
            item?.id == id ? ( { ...item, caption:post?.caption
            }) : (item))
        console.log("json",newImages)
        localStorage.setItem("images",JSON?.stringify(newImages))
        navigate("/final-card", { state: { post } });
    };
    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "40px"  ,minHeight:"100vh" , background:"url(https://as1.ftcdn.net/v2/jpg/09/58/77/80/1000_F_958778095_xtNgOHfkqIOz33CeCN0wVPX8Fkh9QgAj.jpg)" , backgroundRepeat:"no-repeat" ,backgroundSize:"cover" }}>
            {post ? (
                <div style={{ textAlign: "center",background:"white", margin: "0 auto", maxWidth: "500px" , border:"2px solid gray" ,padding:"5px", boxShadow:"10px 10px .1 black",    borderRadius: "10px",    }}>
                    <img
                        src={post.image}
                        alt={`Post ${post.id}`}
                        style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginBottom: "20px",
                        }}
                    />
                    {/* <h3>{post.title}</h3>*/}
                    <p>{post.caption}</p> 
                    <input
                        type="text"
                        // value={post.caption}
                        onChange={(e) => setPost({ ...post, caption: e.target.value })}
                        placeholder="Enter caption"
                        style={{
                            width: "80%",
                            padding: "10px",
                            marginBottom: "20px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                        }}
                    />
                    <button
                        onClick={saveCaption}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Save Caption
                    </button>
                </div>
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px", padding:"20px" ,margin:"auto" ,background:"white",
                    width:"fit-content",
                    borderRadius:"20px"
                 }}>Loading image...</p>
            )}
        </div>
    );
};

export default AddCaptionPage;
