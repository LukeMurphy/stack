<style>

.button {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    padding: 5px 8px;
    border: 1px solid #7c6b6d;
    border-radius: 6px;
    background: #bababa;
    background: -webkit-gradient(linear, left top, left bottom, from(#bababa), to(#fff));
    background: -moz-linear-gradient(top, #bababa, #fff);
    background: linear-gradient(to bottom, #bababa, #fff);
    /*text-shadow: #4e4344 1px 1px 1px;*/
    font: normal normal  11px arial;
    color: #000;
    text-decoration: none;
    text-transform: none;
}
.button:hover {
    border: 1px solid ##9b8688;
    background: #0000ff;
    background: -webkit-gradient(linear, left top, left bottom, from(#0000ff), to(#0000ff));
    background: -moz-linear-gradient(top, #0000ff, #0000ff);
    background: linear-gradient(to bottom, #0000ff, #0000ff);
    color: #fff;
    text-decoration: none;
    text-transform: none;
}
.button:active {
    background: #707070;
    background: -webkit-gradient(linear, left top, left bottom, from(#707070), to(#636363));
    background: -moz-linear-gradient(top, #707070, #636363);
    background: linear-gradient(to bottom, #707070, #636363);
    text-transform: none;
}
.button:focus {
    text-transform: none;
}

</style>


<script src="/projects/stack/drawing/js/drawing_local.js"></script>
<br />
<div id="tools">
	<!-- <input type="button" value="Save" id="btn" size="30" onclick="save(this)">  

	<input type="button" value="Download" id="dlbtn" onclick="save(this)" size="30" class="button">
	-->
<div id = "debug" style="position:relative; top:50px; left; 10px; width:200px; "></div>
	<input type="button" value="Clear All" id="clr" size="23" onclick="erase()" class="button">
	<input type="button" value="Color" id="clr" size="23" onclick="useMultiColor=(useMultiColor)?false:true;this.value=(useMultiColor)?'Gray':'Color';" class="button">
	<input type="button" value="Over-sketch" id="clr" size="23" onclick="useVariableDist =(useVariableDist)?false:true;this.value=(useVariableDist)?'Normal':'Over-sketch';" class="button">
	<input type="button" value="Lighter" id="clr" size="23" onclick="lightMode =(lightMode)?false:true;this.value=(lightMode)?'Darker':'Lighter';" class="button">
	<input type="button" value="Heavy" id="clr" size="23" onclick="usePenMode =(usePenMode)?false:true;this.value=(usePenMode)?'Normal':'Heavy';" class="button">
	Black rate<input id="revertToGrayProbability" type="range" min=".01" max=".2" step=".01" onchange="revertToGrayProbability = this.value;" class="button" />
	Color change rate<input id="newColorProbabilty" type="range" min=".1" max="1" step=".01" onchange="newColorProbabilty = this.value;" class="button"/>
</div>
<div id="canvasHolder"></div>


