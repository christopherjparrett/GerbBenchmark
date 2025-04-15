import React, { useEffect, useState } from 'react';
import '../Styles/Leaderboard.css';
interface Leader {
  Name: string;
  [key: string]: any; 
}

interface LeaderboardProps {
  gameId: number; //1=Color, 2=Reaction, 3=Typing
  gameLabel: string;
  show: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ gameId, gameLabel, show }) => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    if (!show) return;
      console.log("Leaderboard - Game ID is: "+gameId);
    const fetchLeaderboard = async () => {
      const res = await fetch('https://card.christopherjparrett.xyz/api/pullLeaderBoard', {
        method: 'POST',
        body: JSON.stringify({ gameId }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      setLeaders(data.gameLeaders || []);
    };

    fetchLeaderboard();
  }, [show, gameId]);

  if (!show) return null;

  return (
    <div className="leaderboard">
      <h3>🏆 Top 10 Players</h3>
      <ol>
        {leaders.map((user, index) => (
          <li key={index}>
            {user.Name}: {user[gameLabel]}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;