import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  clone_url?: string;
}

function User() {
  const router = useRouter();
  const { id } = router.query;

  const [userDetails, setUserDetails] = useState<GitHubUser | null>(null);
  const [userRepositories, setUserRepositories] = useState<GitHubRepository[]>([]);

  const fetchUserDetails = () => {
    if (!id) return;

    // Make a GET request to the GitHub API to fetch user details
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        return response.json();
      })
      .then((data) => {
        setUserDetails(data);
        console.log('userDetails',userDetails);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };

  const fetchUserRepositories = () => {
    if (!id) return;
    // Make a GET request to the GitHub API to fetch user repositories
    fetch(`https://api.github.com/users/${id}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user repositories');
        }
        return response.json();
      })
      .then((data) => {
        setUserRepositories(data);
        console.log(userRepositories,'userRepositories');
        
      })
      .catch((error) => {
        console.error('Error fetching user repositories:', error);
      });
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserRepositories();
  }, [id])

  return (
    <div className='w-full h-full font-mono text-white bg-gradient-to-r from-[#25c481] to-[#25b7c4]'>
       <Layout title="Teleparty Assignment">
          {
            !userDetails || !userRepositories ? <div className='w-full h-[65vh]'>
              <p>Sorry Unable to fetch Data</p>
            </div> : 
            
            <div className='flex w-[90%] lg:w-[80%] mx-auto'>
              <div className='flex-[0.3]'>
                <div className='flex flex-col'>
                <img className='rounded-full mx-auto'  width={200} height={200} src={userDetails?.avatar_url} alt={userDetails?.avatar_url}  />
                <p className='text-lg text-center my-4'>{userDetails?.login}</p>
                </div>
              </div>
              <div className='flex-[0.7]'>
                {

                  userRepositories?.map((repository) =>(
                    <Link key={repository.id} href={repository?.clone_url ? repository?.clone_url : `/` }>
                      <div className='border-2 my-2 border-white '>
                        <p className='p-2'>{repository?.name}</p>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          }
       </Layout>
    </div>
  )
}

export default User