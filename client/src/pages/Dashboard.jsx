import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';

  const statusLabel = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    review: 'Review',
    done: 'Done',
  };

  const statusIcon = {
    todo: '○',
    'in-progress': '◐',
    review: '◑',
    done: '●',
  };

  const priorityStyle = {
    low: {
      background: '#f0fdf4',
      color: '#166534',
      border: '1px solid #bbf7d0',
    },
    medium: {
      background: '#fffbeb',
      color: '#92400e',
      border: '1px solid #fde68a',
    },
    high: {
      background: '#fff7ed',
      color: '#9a3412',
      border: '1px solid #fdba74',
    },
    urgent: {
      background: '#fef2f2',
      color: '#991b1b',
      border: '1px solid #fca5a5',
    },
  };

  const pageStyle = {
    minHeight: '100vh',
    padding: '24px',
    background: `
      radial-gradient(circle at top left, rgba(251,146,60,0.22), transparent 28%),
      radial-gradient(circle at top right, rgba(255,237,213,0.75), transparent 30%),
      linear-gradient(135deg, #fff7ed 0%, #ffffff 42%, #fffbeb 100%)
    `,
    color: '#1f2937',
  };

  const headerStyle = {
    marginBottom: '24px',
    padding: '22px 24px',
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.88)',
    border: '1px solid rgba(251,146,60,0.16)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 12px 40px rgba(251,146,60,0.12)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '18px',
    marginBottom: '22px',
  };

  const statBase = {
    borderRadius: '22px',
    padding: '20px',
    minHeight: '118px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    border: '1px solid rgba(251,146,60,0.12)',
    boxShadow: '0 10px 28px rgba(251,146,60,0.10)',
  };

  const cardStyle = {
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.92)',
    border: '1px solid rgba(251,146,60,0.14)',
    boxShadow: '0 12px 35px rgba(251,146,60,0.10)',
    overflow: 'hidden',
  };

  const cardHeaderStyle = {
    padding: '18px 20px',
    borderBottom: '1px solid rgba(251,146,60,0.10)',
    color: '#111827',
  };

  const cardBodyStyle = {
    padding: '18px 20px',
  };

  const dashRowStyle = {
    display: 'grid',
    gridTemplateColumns: '1.3fr 0.9fr',
    gap: '18px',
    marginBottom: '22px',
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  };

  if (loading) {
    return (
      <div style={{ ...pageStyle, display: 'grid', placeItems: 'center' }}>
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: '4px solid rgba(251,146,60,0.16)',
            borderTopColor: '#f97316',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ ...pageStyle, display: 'grid', placeItems: 'center' }}>
        <div
          style={{
            padding: '18px 20px',
            borderRadius: '16px',
            background: 'rgba(254, 242, 242, 0.9)',
            border: '1px solid rgba(248, 113, 113, 0.22)',
            color: '#991b1b',
          }}
        >
          Failed to load dashboard
        </div>
      </div>
    );
  }

  const s = data.stats;
  const pct = s.totalTasks ? Math.round((s.doneTasks / s.totalTasks) * 100) : 0;

  const statCards = [
    {
      label: 'Projects',
      value: s.projects,
      icon: '📁',
      bg: 'linear-gradient(135deg, #fff7ed, #fed7aa)',
    },
    {
      label: 'Total Tasks',
      value: s.totalTasks,
      icon: '📋',
      bg: 'linear-gradient(135deg, #ffffff, #fde68a)',
    },
    {
      label: 'Completed',
      value: `${pct}%`,
      icon: '✅',
      bg: 'linear-gradient(135deg, #ecfccb, #bbf7d0)',
    },
    {
      label: 'Team',
      value: s.teamMembers,
      icon: '👥',
      bg: 'linear-gradient(135deg, #ffedd5, #fdba74)',
    },
  ];

  const taskBars = [
    ['To Do', s.todoTasks, 'linear-gradient(90deg, #fb923c, #fdba74)'],
    ['In Progress', s.inProgressTasks, 'linear-gradient(90deg, #f97316, #fb7185)'],
    ['Review', s.reviewTasks, 'linear-gradient(90deg, #f59e0b, #facc15)'],
    ['Done', s.doneTasks, 'linear-gradient(90deg, #22c55e, #84cc16)'],
  ];

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#111827' }}>
          Dashboard
        </h1>
        <p style={{ margin: '8px 0 0', color: '#6b7280' }}>
          Welcome back, {user?.name}
        </p>
      </div>

      <div style={gridStyle}>
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              ...statBase,
              background: card.bg,
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '18px',
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(251,146,60,0.10)',
                fontSize: '22px',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <div style={{ display: 'grid' }}>
              <span style={{ fontSize: '30px', fontWeight: 900, color: '#111827', lineHeight: 1 }}>
                {card.value}
              </span>
              <span style={{ marginTop: '6px', fontSize: '14px', color: '#6b7280' }}>
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={dashRowStyle}>
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>
              Task Breakdown
            </h3>
          </div>
          <div style={cardBodyStyle}>
            {taskBars.map(([label, count, gradient]) => (
              <div
                key={label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr 40px',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '14px',
                }}
              >
                <span style={{ color: '#6b7280', fontSize: '14px' }}>{label}</span>
                <div
                  style={{
                    height: '10px',
                    borderRadius: '999px',
                    background: 'rgba(251,146,60,0.10)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${s.totalTasks ? (count / s.totalTasks) * 100 : 0}%`,
                      height: '100%',
                      borderRadius: '999px',
                      background: gradient,
                    }}
                  />
                </div>
                <span style={{ color: '#111827', fontWeight: 700, textAlign: 'right' }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...cardStyle, background: 'rgba(255,255,255,0.95)' }}>
          <div style={cardHeaderStyle}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>
              ⚠️ Overdue Tasks
            </h3>
          </div>
          <div style={cardBodyStyle}>
            {data.overdueTasks.length === 0 ? (
              <p style={{ margin: 0, color: '#166534', fontWeight: 600 }}>No overdue tasks 🎉</p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {data.overdueTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => navigate(`/projects/${t.project_id}`)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #fff7ed, #ffffff)',
                      border: '1px solid rgba(251,146,60,0.14)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{t.title}</div>
                      <div style={{ marginTop: '6px', color: '#6b7280', fontSize: '13px' }}>
                        {t.project_name} · Due {fmt(t.due_date)}
                      </div>
                    </div>
                    <span
                      style={{
                        ...badgeStyle,
                        ...priorityStyle[t.priority],
                      }}
                    >
                      {t.priority}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>
            Recent Activity
          </h3>
        </div>
        <div style={cardBodyStyle}>
          {data.recentTasks.length === 0 ? (
            <p style={{ margin: 0, color: '#6b7280' }}>
              No tasks yet. Create a project to get started!
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {data.recentTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigate(`/projects/${t.project_id}`)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.88)',
                    border: '1px solid rgba(251,146,60,0.10)',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr auto auto',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 18px rgba(251,146,60,0.06)',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '12px',
                      display: 'grid',
                      placeItems: 'center',
                      background:
                        t.status === 'done'
                          ? 'rgba(34,197,94,0.14)'
                          : t.status === 'review'
                          ? 'rgba(245,158,11,0.14)'
                          : t.status === 'in-progress'
                          ? 'rgba(249,115,22,0.14)'
                          : 'rgba(251,146,60,0.12)',
                      color: '#111827',
                      fontSize: '18px',
                    }}
                  >
                    {statusIcon[t.status]}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{t.title}</div>
                    <div style={{ marginTop: '5px', color: '#6b7280', fontSize: '13px' }}>
                      {t.project_name}
                      {t.assignee_name ? ` · ${t.assignee_name}` : ''}
                    </div>
                  </div>

                  <span
                    style={{
                      ...badgeStyle,
                      ...priorityStyle[t.priority],
                    }}
                  >
                    {t.priority}
                  </span>

                  <span
                    style={{
                      ...badgeStyle,
                      background:
                        t.status === 'done'
                          ? 'rgba(34,197,94,0.12)'
                          : t.status === 'review'
                          ? 'rgba(245,158,11,0.12)'
                          : t.status === 'in-progress'
                          ? 'rgba(249,115,22,0.12)'
                          : 'rgba(251,146,60,0.12)',
                      color: '#111827',
                      border: '1px solid rgba(251,146,60,0.10)',
                    }}
                  >
                    {statusLabel[t.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}