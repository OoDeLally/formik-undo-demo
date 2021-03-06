import { IconButton } from '@material-ui/core';
import RedoIcon from '@material-ui/icons/Redo';
import ResetIcon from '@material-ui/icons/Replay';
import UndoIcon from '@material-ui/icons/Undo';
import { FormikUndoControlBar, FormikUndoControlBarProps } from 'formik-undo';
import React, { useMemo } from 'react';


type ButtonKind = 'reset' | 'undo' | 'redo';


const defaultButtonIcons: Record<ButtonKind, React.ComponentType> = {
  reset: ResetIcon,
  undo: UndoIcon,
  redo: RedoIcon,
};


export const MaterialFormikUndoControlBar = ({ buttonIcons, ...props }: FormikUndoControlBarProps) => {
  const icons = useMemo(() => ({ ...defaultButtonIcons, ...buttonIcons }), [buttonIcons]);
  return (
    <FormikUndoControlBar buttonIcons={icons} buttonComponent={IconButton} {...props} />
  );
};
