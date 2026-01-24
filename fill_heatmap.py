import os
import random
import subprocess
from datetime import datetime, timedelta

def git_commit(date_str):
    env = os.environ.copy()
    env['GIT_AUTHOR_DATE'] = date_str
    env['GIT_COMMITTER_DATE'] = date_str
    subprocess.run(['git', 'commit', '--allow-empty', '-m', 'update heatmap', '--date', date_str], env=env, check=True)

def fill_heatmap(days=90):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    
    current_date = start_date
    while current_date <= end_date:
        # 60% chance of committing on a given day
        if random.random() < 0.6:
            num_commits = random.randint(1, 5)
            for _ in range(num_commits):
                date_str = current_date.strftime('%Y-%m-%dT%H:%M:%S')
                git_commit(date_str)
                print(f"Committed on {date_str}")
        
        current_date += timedelta(days=1)

if __name__ == "__main__":
    fill_heatmap()
