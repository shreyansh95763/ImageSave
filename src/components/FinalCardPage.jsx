import React from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";

const FinalCardPage = () => {
    const { state } = useLocation();
    const post = state?.post;

    {console.log("Imag22e",post)}
    const downloadCard = async () => {
        const cardElement = document.getElementById("final-card");
        if (cardElement) {
            const canvas = await html2canvas(cardElement, { useCORS: true });
            const dataURL = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = dataURL;
            link.download = `Image-${post?.id || "images"}.png`;
            link.click();
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "15vh", minHeight:"100vh" , background:"url(https://as1.ftcdn.net/v2/jpg/09/58/77/80/1000_F_958778095_xtNgOHfkqIOz33CeCN0wVPX8Fkh9QgAj.jpg)" , backgroundRepeat:"no-repeat" ,backgroundSize:"cover" , textAlign: "center" }}>
            {post ? (
                <div
                    id="final-card"
                    style={{
                        margin: "0 auto",
                        padding: "20px",
                        maxWidth: "400px",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff",
                        textAlign: "center",
                    }}
                >
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
                    {post.caption && (
                        <p style={{ fontSize: "16px", textTransform: "capitalize", marginTop: "10px", color: "#333" }}>
                            <strong>Caption:</strong> {post.caption}
                        </p>
                    )}
                </div>
            ) : (
                <p>No post found. Please go back and add a caption.</p>
            )}

            {post && (
                <button
                    onClick={downloadCard}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "blue",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Download Image
                </button>
            )}
        </div>
    );
};

export default FinalCardPage;
