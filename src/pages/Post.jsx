import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import Layout from "../components/Layout";
import { contentfulClient } from '../utils/createContentfulClient';

function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState(null); // o estado inicial do post é null
	const navigate = useNavigate();
	
    const getPost = async () => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: 'blogPost',
                'fields.blogPostSlug': slug,
            });

            console.log(response);
            setPost(response.items[0] || null);
        } catch (error) {
            console.log('Erro ao buscar o post', error);
            setPost(null);
        }
    };

    useEffect( () => {
        getPost(); // no load do documento, chama o método getPost
    }, [] ); // onLoad do nosso componente

    return (
        <Layout>
            <main className="container my-4">
                <div className="row">
                    <div className="col">
                        {!post && <div>Carregando...</div>}

                        {post && (
                            <>
                                <h1>{post.fields.blogPostTitle}</h1>
                        
                                <div 
                                    dangerouslySetInnerHTML={{ __html: documentToHtmlString(post.fields.blogPostContent)}}
                                />
                                
								<div className="fixedOnBottom">
									<Link to={'..'}
										onClick={(e) => {
										  e.preventDefault();
										  navigate(-1);
										}} className="btn btn-dark">
										Voltar
									</Link>
								</div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Post;