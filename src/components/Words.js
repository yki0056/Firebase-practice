import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

// 파이어베이스 리얼타임데이타베이스를 사용해봄.
// 밑에는 fetch를 이용한 정보 받기, 전달 .   fetch를 이용해 전달시 문제점 발견.
// firebase에서 정보를 다룰때 fetch를 사용 안하지않고. firebase에서 주는 method를 사용.
// fetch를 사용하면 문제점이 생겼는데, 정보를 (ex.객체를) firebase data에 보내면  database의 배열이 객체로 바뀌어있음ㄷ  

const databaseURL = "https://noteprojec-53357-default-rtdb.firebaseio.com";

const useStyles = makeStyles({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
})

function Words() {
    const classes = useStyles(); // material ui  makeStyles를 이용한 커스텀 스타일 

    const [words, setWords] = useState([])
    const [isLoading, setisLoading] = useState(true);
    const [dialog, setDialog] = useState(false);
    const [wordState, setwordState] = useState('');
    const [weightState, setweightState] = useState('');

    // + 버튼 ----------------------------------------------------------------
    const handleDialogToggle = () => {
        setDialog(!dialog)
    }
    // 텍스트 인풋 입력시 state에 저장 ---------------------
    const handleValueChange = (e) => {
        if (e.target.name === 'word') {
            setwordState(e.target.value);
        }
        if (e.target.name === 'weight') {
            setweightState(e.target.value);
        }
    }
    // 서브밋 버튼 ------------------------------------------------------------
    const handleSubmit = () => {
        const ww = { word: wordState, weight: weightState }

        handleDialogToggle();
        if (!wordState && !weightState) { // 사용자가 입력을 하지 않았을경우
            alert('{lease put infos')
            return
        }
        // console.log(ww)   // {word:'사이몬', weight:'100'}
        _post(ww)
    }
    // 정보 서버에 업로드 
    const _post = (ww) => { // console.log(ww)  // {word:'사이몬', weight:'100'}
        return fetch(`${databaseURL}/words.json`, {
            method: 'POST',
            body: JSON.stringify(ww)
        }).then(res => {
            if (res.status != 200) { // 저상적으로 데이터가 안 보내졌다면...
                throw new Error(res.statusText);
            }
            return res.json()//정삭적으로 보내졌다면, 서버에는 저장됨  [ -Mj6m_p4pKBZNZlXRX4z:{word:"사이몬", weight:"100"} ]
        }).then(data => { // 이제 이곳 state에 새로운 정보를 추가해서 브라우저에 띄우게함. 
            // 서버에서 내가 보낸 정보의 이름을 만들어서 보내줌 
            // console.log(data) // {name: "-Mj6m_p4pKBZNZlXRX4z"} 
            // 메인state에 서버에서 만들어진 이름으로 객체를 만들어  state배열에 넣음 
            setWords([...words, data.name = ww]) // [ 기존state, -Mj6m_p4pKBZNZlXRX4z:{word:"사이몬", weight:"100"} ]
        });
    }
    // 삭제 버튼 ------------------------------------------------------------
    const handleDelete = (id) => {
        _delete(id)
    }

    const _delete = (id) => {
        return fetch(`${databaseURL}/words/${id}.json`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status != 200) {  // 삭제 실패시 
                throw new Error(res.statusText);
            }
            return res.json();   // 삭제 성공시 
        }).then(() => {
            let nextState = words; //  [{...}, {...} ... ]
            nextState.splice(id, 1) // console.log(nextState)
            setWords(nextState);
        })
    }
    //-------------------------------------------------------------------
    useEffect(() => {
        (async () => {
            setisLoading(true);
            try {
                const resp = await fetch(databaseURL + '/words.json');
                const data = await resp.json();
                console.log(data)
                setWords(data)
                setisLoading(false);
                return
            } catch (err) {
                alert(err)
                return
            }
        })();
    }, [])

    const tp = () => {
        if (isLoading === false) {
            let copyWords = words; //카피 //console.log(copyWords) // [{weight: 5, word: "사랑"}, {weight: 3, word: "영혼"}, {weight: 7, word: "기적"}]
            let wDisplay = copyWords.map((w, i) => {
                return (
                    <div key={i}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    가중치: {w.weight}
                                </Typography>

                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant="h5" component="h2">
                                            {w.word}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="primary" onClick={() => handleDelete(i)}>삭제</Button>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                        <Fab color="primary" className={classes.fab} onClick={handleDialogToggle}>
                            <AddIcon />
                        </Fab>

                        {/*dialog값이 true라면 보이고, dialog값이 false면 안보임 */}
                        <Dialog open={dialog} onClose={handleDialogToggle}>
                            <DialogTitle>단어 추가</DialogTitle>
                            <DialogContent>
                                <TextField label="단어" type="text" name="word" value={wordState} onChange={handleValueChange}></TextField>
                                <br />
                                <TextField label="가중치" type="text" name="weight" value={weightState} onChange={handleValueChange}></TextField>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>추가</Button>
                                <Button variant="outlined" color="primary" onClick={handleDialogToggle}>닫기</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
            })
            return wDisplay
        } else {
            return <div>Loading...</div>
        }
    }

    return (
        <>
            {tp()}
        </>
    )
}

export default Words
