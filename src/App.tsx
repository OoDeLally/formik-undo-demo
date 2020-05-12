import { Button, Checkbox, createStyles, CssBaseline, Divider, FormControlLabel, List, ListItem, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik'; // Using formik-undo's  formik module one folder up.
import { useFormikUndo, AutoSaveOptions, FormikUndo } from 'formik-undo';
import React, { useEffect, useRef, useState } from 'react';
import { MaterialFormikUndoControlBar } from './MaterialUiFormikUndoControlBar';



type Article = {
  title: string;
  content: string;
  checkboxA: boolean;
  checkboxB: boolean;
  checkboxC: boolean;
}


const initialValues = {
  title: '',
  content: '',
  checkboxA: true,
  checkboxB: false,
  checkboxC: true,
};


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    main: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      flex: 3,
    },
    sidebar: {
      display: 'block',
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      flex: 1,
      flexDirection: 'column',
    },
    manualSaveButton: {
      display: 'block',
      marginBottom: theme.spacing(2),
    },
    autoSaveControl: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    autoSaveControlField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: 'block',
      width: '5em',
    },
    undoableCounter: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '9em',
    },
    undoControlBar: {
      display: 'flex',
      alignItems: 'center',
    },
    undoControlBarTitle: {
      display: 'block',
      width: '20em',
    },
    vanillaControlBar: {
      margin: theme.spacing(1),
    },
    titleField: {
      display: 'block',
      width: '23em',
    },
    contentField: {
      display: 'block',
      marginTop: theme.spacing(4),
      width: '23em',
    },
  }),
);


const SaveCheckpointButton = () => {
  const classes = useStyles();
  const { saveCheckpoint } = useFormikUndo<Article>();
  return (
    <div>
      <Button
        className={classes.manualSaveButton}
        variant="contained"
        size="small"
        onClick={() => saveCheckpoint()}
        title="Create a checkpoint now in the undo history"
      >
        Save now
      </Button>
    </div>
  );
};


const UndoableCounter = () => {
  const classes = useStyles();
  const { undoableCount } = useFormikUndo();
  return (
    <TextField
      className={classes.undoableCounter}
      type="number"
      disabled={true}
      label="Undoable Count"
      size="small"
      value={undoableCount}
    />
  );
};


const RedoableCounter = () => {
  const classes = useStyles();
  const { redoableCount } = useFormikUndo();
  return (
    <TextField
      className={classes.undoableCounter}
      type="number"
      disabled={true}
      label="Redoable Count"
      size="small"
      value={redoableCount}
    />
  );
};

const initialAutoSaveOptions: AutoSaveOptions = {
  enabled: true,
  throttleDelay: 1000,
  saveOnFieldChange: true,
  preventWordCutting: true,
};

const AutoSaveControl = ({ onAutoSaveOptionsChange }: { onAutoSaveOptionsChange: (options: AutoSaveOptions) => void }) => {
  const classes = useStyles();
  const [enabled, setEnabled] = useState(initialAutoSaveOptions.enabled);
  const [preventWordCutting, setPreventWordCutting] = useState(initialAutoSaveOptions.preventWordCutting);
  const [throttleDelay, setThrottleDelay] = useState(initialAutoSaveOptions.throttleDelay);
  const [saveOnFieldChange, setSaveOnFieldChange] = useState(initialAutoSaveOptions.saveOnFieldChange);
  const isFirstRenderRef = useRef(true);
  useEffect(
    () => {
      if (isFirstRenderRef.current) {
        isFirstRenderRef.current = false;
        return;
      }
      onAutoSaveOptionsChange({ enabled, throttleDelay, saveOnFieldChange, preventWordCutting });
    },
    [enabled, throttleDelay, saveOnFieldChange, onAutoSaveOptionsChange, preventWordCutting],
  );
  return (
    <div className={classes.autoSaveControl}>
      <FormControlLabel
        control={
          <Checkbox checked={enabled} onChange={(e, checked) => setEnabled(checked)} />
        }
        label="AutoSave"
      />
      <List>
        <ListItem>
          <FormControlLabel
            control={
              <Checkbox checked={saveOnFieldChange} disabled={!enabled} onChange={(e, checked) => setSaveOnFieldChange(checked)} />
            }
            label="Save on field change"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Checkbox checked={preventWordCutting} disabled={!enabled} onChange={(e, checked) => setPreventWordCutting(checked)} />
            }
            label="Prevent word cutting"
          />
        </ListItem>
        <ListItem>
          <TextField
            className={classes.autoSaveControlField}
            disabled={!enabled}
            type="number"
            label="Throttle"
            size="small"
            value={throttleDelay}
            onChange={
              (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setThrottleDelay(+e.target.value)
            }
          />
        </ListItem>
      </List>
    </div>
  );
};


const Sidebar = ({ onAutoSaveOptionsChange }: { onAutoSaveOptionsChange: (options: AutoSaveOptions) => void }) => {
  return (
    <>
      <SaveCheckpointButton />
      <Divider/>
      <UndoableCounter/>
      <RedoableCounter/>
      <Divider/>
      <AutoSaveControl onAutoSaveOptionsChange={onAutoSaveOptionsChange} />
    </>
  )
};


const MyForm = () => {
  const classes = useStyles();
  return (
    <Form>
      <div className={classes.undoControlBar}>
        <MaterialFormikUndoControlBar />
      </div>
      <Field
        as={TextField}
        className={classes.titleField}
        fullWidth
        label="Title"
        name="title"
      />
      <Field
        as={TextField}
        className={classes.contentField}
        fullWidth
        name="content"
        label="Content"
        variant="outlined" multiline
        rows={3}
      />
      <FormControlLabel
        control={<Field as={Checkbox} type="checkbox" name="checkboxA" />}
        label="Checkbox A"
      />
      <FormControlLabel
        control={<Field as={Checkbox} type="checkbox" name="checkboxB" />}
        label="Checkbox B"
      />
      <FormControlLabel
        control={<Field as={Checkbox} type="checkbox" name="checkboxC" />}
        label="Checkbox C"
      />
      <ListItem>
      </ListItem>
    </Form>
  )
};


const App = () => {
  const classes = useStyles();
  const [autoSaveOptions, setAutoSaveOptions] = useState<AutoSaveOptions>(initialAutoSaveOptions);

  const handleSubmit = (article: Article) => {
    //...
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <FormikUndo autoSave={autoSaveOptions}>
            <Paper className={classes.main}>
              <MyForm />
            </Paper>
            <Paper className={classes.sidebar}>
              <Sidebar onAutoSaveOptionsChange={setAutoSaveOptions} />
            </Paper>
          </FormikUndo>
        </Formik>
    </div>
  );
};

export default App;
