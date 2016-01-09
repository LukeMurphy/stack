

<br />
<div id="canvasHolder"></div>
<br />
<script src="/projects/stack/drawing/js/drawing.js"></script>
<div>
	<input type="button" value="Save" id="btn" size="30" onclick="save()">
	<input type="button" value="Clear" id="clr" size="23" onclick="erase()">
	<input type="button" value="Color" id="clr" size="23" onclick="useMultiColor=(useMultiColor)?false:true;this.value=(useMultiColor)?'Gray':'Color';">
	<input type="button" value="Over-sketch" id="clr" size="23" onclick="useVariableDist =(useVariableDist)?false:true;this.value=(useVariableDist)?'Normal':'Over-sketch';">
	<input type="button" value="Lighter" id="clr" size="23" onclick="lightMode =(lightMode)?false:true;this.value=(lightMode)?'Darker':'Lighter';">
	<input type="button" value="Pen/Heavy" id="clr" size="23" onclick="usePenMode =(usePenMode)?false:true;this.value=(usePenMode)?'Mouse':'Pen/Heavy';">
<div id = "debug" style="position:relative; top:50px; left; 10px; width:200px; "></div>
</div>

