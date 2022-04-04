from django.core.management.base import BaseCommand, CommandError
from django.db import models
from decimal import Decimal
from bs4 import BeautifulSoup
import requests
from api.models import Season, L30, L7, zSeason, zL30, zL7, Player
# Create your models here.


class Command(BaseCommand):
    def handle(self, *args, **options):
        Season.objects.all().delete()
        L30.objects.all().delete()
        L7.objects.all().delete()
        zSeason.objects.all().delete()
        zL30.objects.all().delete()
        zL7.objects.all().delete()
        Player.objects.all().delete()
        html_PerGame = requests.get(
        'https://www.basketball-reference.com/leagues/NBA_2022_per_game.html').text
        soup = BeautifulSoup(html_PerGame, "html.parser")
        fullTable = soup.select('td')
        for i in range(0, len(fullTable), 29):
            pid = ''.join(fullTable[i]['data-append-csv'])
            team_id = ''.join(fullTable[i+1].text)            
            name = ''.join(fullTable[i].text)
            pos = ''.join(fullTable[i+1].text)
            age = ''.join(fullTable[i+2].text)
            team_id = ''.join(fullTable[i+3].text)
            g = ''.join(fullTable[i+4].text)
            gs = ''.join(fullTable[i+5].text)
            mp_per_g = ''.join(fullTable[i+6].text)
            fg = ''.join(fullTable[i+7].text)
            fga = ''.join(fullTable[i+8].text)
            fg_pct = (''.join(fullTable[i+9].text),0)[''.join(fullTable[i+9].text)==""]
            fg3 = ''.join(fullTable[i+10].text)
            fg3a = ''.join(fullTable[i+11].text)
            fg3_pct = (''.join(fullTable[i+12].text),0)[''.join(fullTable[i+12].text)==""]
            fg2 = ''.join(fullTable[i+13].text)
            fg2a = ''.join(fullTable[i+14].text)
            fg2_pct = (''.join(fullTable[i+15].text),0)[''.join(fullTable[i+15].text)==""]
            efg_pct = (''.join(fullTable[i+16].text),0)[''.join(fullTable[i+16].text)==""]
            ft = ''.join(fullTable[i+17].text)
            fta = ''.join(fullTable[i+18].text)
            ft_pct = (''.join(fullTable[i+19].text),0)[''.join(fullTable[i+19].text)==""]
            orb = ''.join(fullTable[i+20].text)
            drb = ''.join(fullTable[i+21].text)
            trb = ''.join(fullTable[i+22].text)
            ast = ''.join(fullTable[i+23].text)
            stl = ''.join(fullTable[i+24].text)
            blk = ''.join(fullTable[i+25].text)
            tov = ''.join(fullTable[i+26].text)
            pf = ''.join(fullTable[i+27].text)
            pts = ''.join(fullTable[i+28].text) 

            foo  = Player.objects.get_or_create(
                nameID = pid,
                name = name,
                pos = pos,
                age = age,
                team_id = team_id
            )
            foo  = Player.objects.get(
                nameID = pid,
                name = name,
                pos = pos,
                age = age,
                team_id = team_id
            )
            
            Season.objects.create(
                playerID = foo,
                name = foo.name,
                pos = foo.pos,
                age = foo.age,
                team_id = team_id,
                g=int(g),
                gs=int(gs),
                mp_per_g= Decimal(mp_per_g),
                fg = Decimal(fg),
                fga = Decimal(fga),
                fg_pct = Decimal(fg_pct),
                fg3 = Decimal(fg3),
                fg3a = Decimal(fg3a),
                fg3_pct = Decimal(fg3_pct),
                ft = Decimal(ft),
                fta = Decimal(fta),
                ft_pct = Decimal(ft_pct),
                trb = Decimal(trb),
                ast = Decimal(ast),
                stl = Decimal(stl),
                blk = Decimal(blk),
                tov = Decimal(tov),
                pf = Decimal(pf),
                pts = Decimal(pts)
            )
            print("Season " + name)


        columns = [
            'fg', 'fga', 'fg_pct', 'fg3', 'fg3a', 'fg3_pct', 'ft','fta', 'ft_pct', 'trb','ast',
            'stl','blk','tov','pts'
        ]
        mean = []
        stanDevArr = []
        n = 200
        def tupfilter(tup):
            x = tup[0]
            return x
        for x in range(len(columns)):
            tempArr = list(Season.objects.filter(gs__gt=20).values_list(columns[x]))
            arr = list(map(tupfilter,tempArr))
            arr.sort(reverse=True)
            xArr = arr[0:n]
            tsum = 0
            for i in xArr:
                tsum = tsum + i
            mean.append(tsum/n)
            stanDevSum = 0
            for i in range(n):
                stanDevSum = stanDevSum + (Decimal(xArr[i])-Decimal(mean[x]))**2
            stanDevArr.append(Decimal((((stanDevSum)/n)**Decimal(0.5))))

        zfg = Decimal(stanDevArr[0])
        zfga = Decimal(stanDevArr[1])
        zfg_pct = Decimal(stanDevArr[2])
        zfg3 = Decimal(stanDevArr[3])
        zfg3a = Decimal(stanDevArr[4])
        zfg3_pct = Decimal(stanDevArr[5])
        zft = Decimal(stanDevArr[6])
        zfta = Decimal(stanDevArr[7])
        zft_pct = Decimal(stanDevArr[8])
        ztrb = Decimal(stanDevArr[9])
        zast = Decimal(stanDevArr[10])
        zstl = Decimal(stanDevArr[11])
        zblk = Decimal(stanDevArr[12])
        ztov = Decimal(stanDevArr[13])
        zpts = Decimal(stanDevArr[14])
        mfg = Decimal(mean[0])
        mfga = Decimal(mean[1])
        mfg_pct = Decimal(mean[2])
        mfg3 = Decimal(mean[3])
        mfg3a = Decimal(mean[4])
        mfg3_pct = Decimal(mean[5])
        mft = Decimal(mean[6])
        mfta = Decimal(mean[7])
        mft_pct = Decimal(mean[8])
        mtrb = Decimal(mean[9])
        mast = Decimal(mean[10])
        mstl = Decimal(mean[11])
        mblk = Decimal(mean[12])
        mtov = Decimal(mean[13])
        mpts = Decimal(mean[14])

        for i in range(0, len(fullTable), 29):
            pid = ''.join(fullTable[i]['data-append-csv'])
            team_id = ''.join(fullTable[i+1].text)            
            name = ''.join(fullTable[i].text)
            pos = ''.join(fullTable[i+1].text)
            age = ''.join(fullTable[i+2].text)
            team_id = ''.join(fullTable[i+3].text)
            g = ''.join(fullTable[i+4].text)
            gs = ''.join(fullTable[i+5].text)
            mp_per_g = ''.join(fullTable[i+6].text)
            fg = ''.join(fullTable[i+7].text)
            fga = ''.join(fullTable[i+8].text)
            fg_pct = (''.join(fullTable[i+9].text),0)[''.join(fullTable[i+9].text)==""]
            fg3 = ''.join(fullTable[i+10].text)
            fg3a = ''.join(fullTable[i+11].text)
            fg3_pct = (''.join(fullTable[i+12].text),0)[''.join(fullTable[i+12].text)==""]
            fg2 = ''.join(fullTable[i+13].text)
            fg2a = ''.join(fullTable[i+14].text)
            fg2_pct = (''.join(fullTable[i+15].text),0)[''.join(fullTable[i+15].text)==""]
            efg_pct = (''.join(fullTable[i+16].text),0)[''.join(fullTable[i+16].text)==""]
            ft = ''.join(fullTable[i+17].text)
            fta = ''.join(fullTable[i+18].text)
            ft_pct = (''.join(fullTable[i+19].text),0)[''.join(fullTable[i+19].text)==""]
            orb = ''.join(fullTable[i+20].text)
            drb = ''.join(fullTable[i+21].text)
            trb = ''.join(fullTable[i+22].text)
            ast = ''.join(fullTable[i+23].text)
            stl = ''.join(fullTable[i+24].text)
            blk = ''.join(fullTable[i+25].text)
            tov = ''.join(fullTable[i+26].text)
            pf = ''.join(fullTable[i+27].text)
            pts = ''.join(fullTable[i+28].text) 

            foo  = Player.objects.get(
                nameID = pid,
                name = name,
                pos = pos,
                age = age,
                team_id = team_id
            )
            zSeason.objects.update_or_create(
                playerID = foo,
                name = foo.name,
                pos = foo.pos,
                age = foo.age,
                team_id = team_id,
                g=int(g),
                gs=int(gs),
                mp_per_g=Decimal(mp_per_g),
                fg = (Decimal(fg)-mfg)/zfg,
                fg_pct = (Decimal(fg_pct)-mfg_pct)/zfg_pct*Decimal(fg)/zfga,
                fg3 = (Decimal(fg3)-mfg3)/zfg3,
                fg3_pct = (Decimal(fg3_pct)-mfg3_pct)/zfg3_pct*Decimal(fg3)/zfg3a,
                ft = (Decimal(ft)-mft)/zft,
                ft_pct = (Decimal(ft_pct)-mft_pct)/zft_pct*Decimal(ft)/zfta,
                trb = (Decimal(trb)-mtrb)/ztrb,
                ast = (Decimal(ast)-mast)/zast,
                stl = (Decimal(stl)-mstl)/zstl,
                blk = (Decimal(blk)-mblk)/zblk,
                tov = (Decimal(tov)-mtov)/ztov,
                pts = (Decimal(pts)-mpts)/zpts
            )
            print("zSeason " + name)

        html_PerGame = requests.get(
            'https://www.basketball-reference.com/friv/last_n_days.fcgi?n=30&type=per_game').text
        soup = BeautifulSoup(html_PerGame, "html.parser")
        fullTable = soup.select('td')
        for i in range(0, len(fullTable), 24):
            pid = ''.join(fullTable[i]['data-append-csv'])
            team_id = ''.join(fullTable[i+1].text)            
            foo  = Player.objects.filter(
                nameID = pid
            )
            foo = foo[0]
            pos = foo.pos
            age = foo.age
            name = ''.join(fullTable[i].text)
            team_id = ''.join(fullTable[i+1].text)
            g = ''.join(fullTable[i+2].text)
            gs = ''.join(fullTable[i+3].text)
            mp_per_g = ''.join(fullTable[i+4].text)
            fg = ''.join(fullTable[i+5].text)
            fga = ''.join(fullTable[i+6].text)
            fg_pct = (''.join(fullTable[i+7].text),0)[''.join(fullTable[i+7].text)==""]
            fg3 = ''.join(fullTable[i+8].text)
            fg3a = ''.join(fullTable[i+9].text)
            fg3_pct = (''.join(fullTable[i+10].text),0)[''.join(fullTable[i+10].text)==""]
            ft = ''.join(fullTable[i+11].text)
            fta = ''.join(fullTable[i+12].text)
            ft_pct = (''.join(fullTable[i+13].text),0)[''.join(fullTable[i+13].text)==""]
            orb = ''.join(fullTable[i+14].text)
            drb = ''.join(fullTable[i+15].text)
            trb = ''.join(fullTable[i+16].text)
            ast = ''.join(fullTable[i+17].text)
            stl = ''.join(fullTable[i+18].text)
            blk = ''.join(fullTable[i+19].text)
            tov = ''.join(fullTable[i+20].text)
            pf = ''.join(fullTable[i+21].text)
            pts = ''.join(fullTable[i+22].text)

            foo  = Player.objects.get_or_create(
                nameID = pid,
                name = name,
                pos = pos,
                age = age,
                team_id = team_id
            )
            foo  = Player.objects.get(
                nameID = pid,
                name = name,
                pos = pos,
                age = age,
                team_id = team_id
            )
            
            L30.objects.update_or_create(
                playerID = foo,
                name = foo.name,
                pos = foo.pos,
                age = age,
                team_id = team_id,
                g=int(g),
                gs=int(gs),
                mp_per_g = Decimal(Decimal(mp_per_g)),
                fg = Decimal(fg),
                fga = Decimal(fga),
                fg_pct = Decimal(fg_pct),
                fg3 = Decimal(fg3),
                fg3a = Decimal(fg3a),
                fg3_pct = Decimal(fg3_pct),
                ft = Decimal(ft),
                fta = Decimal(fta),
                ft_pct = Decimal(ft_pct),
                trb = Decimal(trb),
                ast = Decimal(ast),
                stl = Decimal(stl),
                blk = Decimal(blk),
                tov = Decimal(tov),
                pf = Decimal(pf),
                pts = Decimal(pts)
            )

            zL30.objects.update_or_create(
                playerID = foo,
                name = foo.name,
                pos = foo.pos,
                age = foo.age,
                team_id = team_id,
                g=int(g),
                gs=int(gs),
                mp_per_g=Decimal(mp_per_g),
                fg = (Decimal(fg)-mfg)/zfg,
                fg_pct = (Decimal(fg_pct)-mfg_pct)/zfg_pct*Decimal(fg)/zfga,
                fg3 = (Decimal(fg3)-mfg3)/zfg3,
                fg3_pct = (Decimal(fg3_pct)-mfg3_pct)/zfg3_pct*Decimal(fg3)/zfg3a,
                ft = (Decimal(ft)-mft)/zft,
                ft_pct = (Decimal(ft_pct)-mft_pct)/zft_pct*Decimal(ft)/zfta,
                trb = (Decimal(trb)-mtrb)/ztrb,
                ast = (Decimal(ast)-mast)/zast,
                stl = (Decimal(stl)-mstl)/zstl,
                blk = (Decimal(blk)-mblk)/zblk,
                tov = (Decimal(tov)-mtov)/ztov,
                pts = (Decimal(pts)-mpts)/zpts
            )
            print("L30 " + name)
        
        html_PerGame = requests.get(
            'https://www.basketball-reference.com/friv/last_n_days.fcgi?n=7&type=per_game').text
        soup = BeautifulSoup(html_PerGame, "html.parser")
        fullTable = soup.select('td')
        for i in range(0, len(fullTable), 24):
            pid = ''.join(fullTable[i]['data-append-csv'])
            team_id = ''.join(fullTable[i+1].text)            
            foo  = Player.objects.filter(
                nameID = pid
            )
            foo = foo[0]
            pos = foo.pos
            age = foo.age
            name = ''.join(fullTable[i].text)
            g = ''.join(fullTable[i+2].text)
            gs = ''.join(fullTable[i+3].text)
            mp_per_g = ''.join(fullTable[i+4].text)
            fg = ''.join(fullTable[i+5].text)
            fga = ''.join(fullTable[i+6].text)
            fg_pct = (''.join(fullTable[i+7].text),0)[''.join(fullTable[i+7].text)==""]
            fg3 = ''.join(fullTable[i+8].text)
            fg3a = ''.join(fullTable[i+9].text)
            fg3_pct = (''.join(fullTable[i+10].text),0)[''.join(fullTable[i+10].text)==""]
            ft = ''.join(fullTable[i+11].text)
            fta = ''.join(fullTable[i+12].text)
            ft_pct = (''.join(fullTable[i+13].text),0)[''.join(fullTable[i+13].text)==""]
            trb = ''.join(fullTable[i+16].text)
            ast = ''.join(fullTable[i+17].text)
            stl = ''.join(fullTable[i+18].text)
            blk = ''.join(fullTable[i+19].text)
            tov = ''.join(fullTable[i+20].text)
            pf = ''.join(fullTable[i+21].text)
            pts = ''.join(fullTable[i+22].text)   

            foo  = Player.objects.get_or_create(
                nameID = pid,
                name = name,
                pos = pos,
                age = age,
                team_id = team_id
            )
            foo  = Player.objects.get(
                nameID = pid,
                name = name,
                pos = pos,
                age = age,
                team_id = team_id
            )
            
            L7.objects.update_or_create(
                playerID = foo,
                name = foo.name,
                pos = foo.pos,
                age = foo.age,
                team_id = team_id,
                g=int(g),
                gs=int(gs),
                mp_per_g=Decimal(mp_per_g),
                fg = Decimal(fg),
                fga = Decimal(fga),
                fg_pct = Decimal(fg_pct),
                fg3 = Decimal(fg3),
                fg3a = Decimal(fg3a),
                fg3_pct = Decimal(fg3_pct),
                ft = Decimal(ft),
                fta = Decimal(fta),
                ft_pct = Decimal(ft_pct),
                trb = Decimal(trb),
                ast = Decimal(ast),
                stl = Decimal(stl),
                blk = Decimal(blk),
                tov = Decimal(tov),
                pf = Decimal(pf),
                pts = Decimal(pts)
            )

            zL7.objects.update_or_create(
                playerID = foo,
                name = foo.name,
                pos = foo.pos,
                age = foo.age,
                team_id = team_id,
                g=int(g),
                gs=int(gs),
                mp_per_g=Decimal(mp_per_g),
                fg = (Decimal(fg)-mfg)/zfg,
                fg_pct = (Decimal(fg_pct)-mfg_pct)/zfg_pct*Decimal(fg)/zfga,
                fg3 = (Decimal(fg3)-mfg3)/zfg3,
                fg3_pct = (Decimal(fg3_pct)-mfg3_pct)/zfg3_pct*Decimal(fg3)/zfg3a,
                ft = (Decimal(ft)-mft)/zft,
                ft_pct = (Decimal(ft_pct)-mft_pct)/zft_pct*Decimal(ft)/zfta,
                trb = (Decimal(trb)-mtrb)/ztrb,
                ast = (Decimal(ast)-mast)/zast,
                stl = (Decimal(stl)-mstl)/zstl,
                blk = (Decimal(blk)-mblk)/zblk,
                tov = (Decimal(tov)-mtov)/ztov,
                pts = (Decimal(pts)-mpts)/zpts
            )
            print("L7 " + name)
