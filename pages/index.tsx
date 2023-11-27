import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import GroupIcon from '@mui/icons-material/Group';
import { GitHubUser } from '../types/GithubResponse';
import { InputForm } from '../types/inputType';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import ClientProvider from '../components/ClientProvider';
import toast from "react-hot-toast";

const IndexPage = () => {

  const [users, setusers] = useState<GitHubUser[]>([]); 
  const [userName, setuserName] = useState<InputForm>({ userName: '' });

  async function fetchData() {
    if(userName.userName){
      toast.promise(
    fetch(`https://api.github.com/search/users?q=${userName.userName}`)
      .then((response) => {
        console.log('response',response);
        
        if (!response.ok) {
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setusers(data.items);   
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setusers([]);
      }),
      {
        loading: 'Fetching...',
        success: <b className="text-sm">github data fetch Successfully!</b>,
        error: <b className="text-sm">error while fetching github data.</b>,
      })
    }
  }

  // fetching user data from github
  useEffect(() => {
    //only if differnce between two key strocks is 300 ms then only function is called
    // for performance optimization 
    const getData = setTimeout(() => {
      fetchData()
    }, 1000)

    return () => clearTimeout(getData);
  }, [userName])
  
  const router = useRouter();
  const handleRowClick = (login) => {
    router.push(`/user/${login}`);
  }  

  return (
    <div className='w-full h-full font-mono bg-gradient-to-r from-[#25c481] to-[#25b7c4]'>
      <Layout title="Teleparty Assignment">
          <ClientProvider />
          <div className='text-white'>
             <div className='flex mx-4'>
                <div className='mx-auto flex bg-white w-[95%] lg:w-[60%]'>
                    <SearchIcon className='w-6 h-6 text-black ml-2 my-auto' />
                    <input placeholder='Type User Name' onChange={e=>setuserName({userName: e.target.value})} spellCheck={false} className='w-[95%] px-2 py-3 rounded-sm outline-none text-black mx-2' />
                </div>
             </div>
             <div className='mx-auto'>
                {
                  userName.userName != '' ? 

                  users.length > 0 ?

                 ( <div className='w-[90%] lg:w-[80%] my-10 mx-auto '>
                    <table className="table-auto w-full border-2 border-white p-4">
                      <thead>
                        <tr className='bg-white-200'>
                          <th className="uppercase py-2 border-b-[1px] border-gray-300">Avatar</th>
                          <th className="uppercase py-2 border-b-[1px] border-gray-300">UserName</th>
                          <th className="uppercase py-2 border-b-[1px] border-gray-300">User Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                           users?.map(user => (
                              <tr className='hover:cursor-pointer border-[1px] border-gray-300' onClick={()=> handleRowClick(user.login)} key={user.id}>
                                <td className='p-3'><img className='rounded-full mx-auto'  width={35} height={35} src={user.avatar_url} alt={user.avatar_url}  /></td>
                                <td><p className='uppercase overflow-hidden text-center mx-auto'>{user.login}</p></td>
                                <td><p className='uppercase overflow-hidden text-center mx-auto'>{user.type}</p></td>
                              </tr>
                           ))
                        }
                      </tbody>
                    </table>
                  </div> ) 
                  :
                  (  <div>
                      <div className='w-[90%] lg:w-[80%] mx-auto mt-10 h-[64vh] grid place-items-center border-2'>
                        <div className='mx-auto'>
                          <div className='flex items-center justify-center'>
                            <GroupIcon className='!w-20 !h-20' />
                          </div>
                          <p className='mx-auto'>No Such UserName Search for something else.</p>
                        </div>
                      </div>
                    </div>)

                  :( <div className='w-[90%] lg:w-[80%] mx-auto mt-10 h-[64vh] grid place-items-center border-2'>
                    <div className='mx-auto'>
                      <div className='flex items-center justify-center'>
                        <GroupIcon className='!w-20 !h-20' />
                      </div>
                      <p className='mx-auto'>Search user name for data.</p>
                    </div>
                  </div>)
                }
             </div>
          </div>
      </Layout>
    </div>
  )
}

export default IndexPage
