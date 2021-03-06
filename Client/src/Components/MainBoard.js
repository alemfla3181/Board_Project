import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function MainBoard() {
  const [User, setUser] = useState(false);
  const [Contents, setContents] = useState([{
    title: '',
    content: '',
    writer: ''
  }])

  useEffect(() => {
    if (window.sessionStorage.getItem("user_Email", JSON.stringify(User))) {
      setUser(true);
    }

    getContent();
  }, [])

  const getContent = () => {
    axios.get("/api/contents/Board").then((response) => {
      if (response.data.success) {
        setContents(response.data.contents);
        // console.log(response.data.contents);

      } else {
        alert("글 내용 가져오기 실패!");
      }
    })
  }
  
  const onDelete = (id) => {
    let body = {
      _id : id,
    }
      if (window.confirm('삭제하시겠쑵니까?')) {
      setContents(Contents.filter(ID => {
        return id !== ID;
      }))
      axios.post('/api/contents/deleteBoard', body).then(response => {
        if (response.data.success) {
          console.log("삭제 완료", id);
          document.location.href = '/';
        } else {
          alert("글 내용 삭제 실패");
        }
      })
    }
  }

  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      sessionStorage.removeItem('user_Email')
      // App 으로 이동(새로고침)
      document.location.href = '/'
  }


  return (
    <div className='LandingPage'>
      {!User ?
        <div>
          <Header />
          <div className='Main_button'>
            <Link to='/login'><button>로그인</button></Link>
            <Link to='/register'><button>회원가입</button></Link>
          </div>
          <Footer />
        </div>
        : <div>
          <Header user={User}/>
          <div className="board-list">
            <table className="w3-table-all">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>제목</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {
                  Contents.map((item, idx) => {
                    return (
                      <tr key={idx}>                       
                        <td>{idx + 1}</td>
                          <Link to={`/contents/${item._id}`}><td>{item.title}</td>  </Link>
                          <td>{item.name}</td>                      
                        <button onClick={() => onDelete(item._id)}>X</button>
                        </tr>                       
                        )
                  })
                }
              </tbody>
            </table>
          </div>
          <Link to='/write'><button>글쓰기</button></Link>
          <button onClick={() => onLogout()}>로그아웃</button>
          <Footer />
        </div>        
      }
    </div>
  )
}

export default MainBoard