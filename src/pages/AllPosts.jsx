import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

import { contentfulClient } from "../utils/createContentfulClient";

function AllPost() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Adiciona o estado para a página atual
    const postsPerPage = 4; // Define o número de posts por página

    const getCategories = async () => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: 'blogCategory',
            });
            setCategories(response.items);
        } catch (error) {
            console.log('Erro ao obter categorias', error);
            setCategories([]);
        }
    };

    const getPosts = async () => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: 'blogPost',
                order: '-sys.createdAt',
            });
            setPosts(response.items);
        } catch (error) {
            console.log('Erro ao obter posts', error);
            setPosts([]);
        }
    };

    useEffect(() => {
        getCategories();
        getPosts();
    }, []); // useEffect -> onLoad do componente Home

    // Calcula os índices dos posts a serem exibidos
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const disableButton = currentPage * postsPerPage >= posts.length;

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
					<div class="col-md-2" />
                    <main className="col-md-8">
                        <h2 className="mb-3">
							Todas as postagens
						</h2>

                        {currentPosts.map((item) => (
                            <Card
                                key={item.sys.id}
                                title={item.fields.blogPostTitle}
                                text={item.fields.blogPostDescription}
                                link={'/post/' + item.fields.blogPostSlug}
                            />
                        ))}

						<div class="fixedOnBottom">
							{/* Botões de próxima e anterior */}
							<button
								class="btn btn-dark"
								onClick={() => setCurrentPage(currentPage - 1)}
								disabled={currentPage === 1}
							>
								Anterior
							</button>
							&nbsp;&nbsp;&nbsp;
							Página {currentPage} de {Math.ceil(posts.length / postsPerPage)}
							&nbsp;&nbsp;&nbsp;
							<button
								class="btn btn-dark"
								onClick={() => setCurrentPage(currentPage + 1)}
								disabled={currentPosts.length < postsPerPage || disableButton}
							>
								Próxima
							</button>
						</div>
                    </main>
					<div class="col-md-2" />
                </div>
            </div>
        </Layout>
    );
}

export default AllPost;