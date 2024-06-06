import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

import { contentfulClient } from "../utils/createContentfulClient";

function AllPost() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Adiciona o estado para a página atual
    const postsPerPage = 3; // Define o número de posts por página

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
                    <main className="col-md-8">
                        <h2 className="mb-3">Posts recentes</h2>

                        {currentPosts.map((item) => (
                            <Card
                                key={item.sys.id}
                                title={item.fields.blogPostTitle}
                                text={item.fields.blogPostDescription}
                                link={'/post/' + item.fields.blogPostSlug}
                            />
                        ))}

                        {/* Botões de próxima e anterior */}
                        <button
                            class="btn btn-dark btnLeft"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                            class="btn btn-dark btnRight"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPosts.length < postsPerPage || disableButton}
                        >
                            Próxima
                        </button>
                    </main>

                    <aside className="col-md-4">
                        <h2>Categorias</h2>
                        <ul>
                            {categories.map((item) => (
                                <li key={item.sys.id}>{item.fields.blogCategoryTitle}</li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </Layout>
    );
}

export default AllPost;