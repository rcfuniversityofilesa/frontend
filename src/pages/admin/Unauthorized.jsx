import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'

export default function Unauthorized() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/auth/login');
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '50px 30px',
          borderRadius: '12px',
          boxShadow:
            '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '20px',
          }}
        >
          403
        </div>

        <h1
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '15px',
          }}
        >
          Access Denied
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '30px',
            lineHeight: '1.6',
          }}
        >
          You are not authorized for this role.
          <br />
          Please login with the correct role to
          access this resource.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/"
            style={{
              padding: '10px 30px',
              backgroundColor: '#3498db',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                '#2980b9')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                '#3498db')
            }
          >
            Go to Home
          </Link>

          <Button onClick={handleLogout} text={"Login Again"} />
        </div>
      </div>
    </div>
  )
}
