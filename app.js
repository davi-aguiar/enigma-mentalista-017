const screen = document.querySelector('#screen');
const storage = {
 get(){try{const value=Number(sessionStorage.getItem('arquivo017-v2'));return Number.isInteger(value)&&value>=0&&value<=5?value:0}catch{return 0}},
 set(value){try{sessionStorage.setItem('arquivo017-v2',String(value))}catch{}}
};
let stage=storage.get();
let view=stage;
const entryHash='#/arquivo/6175726f7261';
// Atualiza também links antigos, que entregavam a credencial em texto puro.
if(location.hash!==entryHash) history.replaceState(null,'',`${location.pathname}${location.search}${entryHash}`);
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z0-9]/g,'');
const form=(label,button,type='text')=>view<stage?'<button class="primary" id="resume" type="button">Retomar investigação <span>→</span></button>':`<form id="answer-form"><label for="answer">${label}</label><input id="answer" name="answer" type="${type}" autocomplete="off" autocapitalize="none" spellcheck="false" required aria-describedby="feedback"><button class="primary" type="submit">${button}<span aria-hidden="true">→</span></button><p id="feedback" class="feedback" role="status"></p></form>`;
const documents=[
 {id:'028',title:'Relatório de vigilância',body:'O veículo cinza deixou o estacionamento às 19:40. O motorista apresentou identificação válida. Nenhum envelope foi encontrado. A equipe encerrou a observação após confirmar o álibi.'},
 {id:'042',title:'Inventário de apreensão',body:'Um caderno com cinco folhas soltas foi recolhido no imóvel. Não há numeração de páginas. As datas foram preservadas na digitalização. Material encaminhado ao setor de documentos.'},
 {id:'071',title:'Registro de entrevista',body:'A testemunha ouviu uma discussão antes da chegada da equipe. Não reconheceu o suspeito nas fotografias. A gravação foi conferida e não contém referências ao envelope.'}
];
function render(focus=false){
 document.querySelectorAll('#progress li').forEach((el,i)=>{el.className=i<stage?'done':i===stage?'active':'';if(i===view&&view<5)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current')});
 document.querySelector('#counter').textContent=view<5?`ETAPA 0${view+1} / 05`:'INVESTIGAÇÃO CONCLUÍDA';
 document.querySelector('.photo-time').textContent=view===0?'EVIDÊNCIA 017-A / 23:17':'EVIDÊNCIA 017-A / LOCAL DO INCIDENTE';
 const pages=[
 `<span class="stamp">CBI / ACESSO RESTRITO</span><h2 id="screen-title">Nem todos podem<br>abrir este caso.</h2><p class="copy">O dossiê foi retirado dos arquivos do CBI. Uma cópia permaneceu. A autorização está sob sua responsabilidade.</p><div class="intake-record"><span>PROTOCOLO DE RECEBIMENTO</span><strong>017-A / 23:17</strong><span>Identificador de origem preservado em base 16.</span></div>${form('CREDENCIAL DE ACESSO','Abrir dossiê','password')}`,
 `<span class="stamp">EVIDÊNCIA 017-B / BILHETE</span><h2 id="screen-title">Ele quer sua atenção.</h2><p class="copy">Um bilhete sem assinatura foi anexado ao caso. O laboratório preservou os caracteres originais.</p><div class="cipher">HIYHVKVZZPL042</div><p class="note">Jane: “César tinha esse hábito de trocar letras. Descubra quanto ele andou antes de tentar segui-lo.”</p><details class="case-document"><summary>Consultar laudo de interceptação</summary><div class="document-body"><span class="stamp">LABORATÓRIO / REGISTRO DE CANAIS</span><p>Canal de origem: III<br>Canal de destino: X<br>Trajeto registrado: avanço, sem retorno.</p><p>Alfabeto de referência: A–Z (26 letras). Espaços não preservados. Algarismos mantidos sem alteração.</p></div></details>${form('CONTEÚDO COMPLETO DO BILHETE','Validar leitura')}`,
 `<span class="stamp">SALA DE ARQUIVOS / TRÊS DOSSIÊS</span><h2 id="screen-title">Qual deles importa?</h2><p class="copy">Três documentos foram recuperados do mesmo armário. Consulte os registros e solicite o material ligado ao bilhete.</p><div class="dossier-list">${documents.map(d=>`<details class="case-document"><summary><span>DOSSIÊ ${d.id}</span> ${d.title}</summary><div class="document-body"><p>${d.body}</p></div></details>`).join('')}</div>${form('NÚMERO DO DOSSIÊ','Solicitar material')}`,
 `<span class="stamp">DOSSIÊ 042 / MATERIAL APREENDIDO</span><h2 id="screen-title">Cinco folhas soltas.</h2><p class="copy">Não há capa nem assinatura. Os trechos abaixo foram digitalizados na ordem em que chegaram.</p><div class="diary"><p><time datetime="2013-09-18">18 SET 2013</time>Tentei voltar ao apartamento. A fechadura tinha sido trocada.</p><p><time datetime="2013-09-05">05 SET 2013</time>Ninguém apareceu no encontro. Esperei até a chuva começar.</p><p><time datetime="2013-09-23">23 SET 2013</time>Espero que o caderno chegue à pessoa certa.</p><p><time datetime="2013-09-14">14 SET 2013</time>Restaram as anotações. O restante foi levado na mudança.</p><p><time datetime="2013-09-09">09 SET 2013</time>O porteiro disse que não me conhecia. Era mentira.</p></div><p class="note">“Cada dia teve um começo.”</p>${form('PALAVRA RECUPERADA','Registrar descoberta')}`,
 `<span class="stamp">COFRE DE EVIDÊNCIAS / LACRE FINAL</span><h2 id="screen-title">Falta um detalhe.</h2><p class="copy">O envelope possui um lacre alfanumérico. Na etiqueta, duas instruções:</p><div class="lock-instructions"><p>I. A palavra que o caderno deixou.</p><p>II. A hora em que o caso entrou, antes de qualquer bilhete.</p></div><p class="copy">Formato do lacre: PALAVRA + HHMM.</p>${form('COMBINAÇÃO DO LACRE','Abrir envelope')}`,
 `<span class="stamp">CASO 017 / RESOLVIDO</span><h2 id="screen-title">Até que enfim, hein?</h2><img class="jane-sticker" src="assets/patrick-jane.png" alt="Figurinha de Patrick Jane sorrindo e levantando uma xícara de chá" width="300" height="300"><p class="jane-caption">“Tudo isso por uma figurinha minha?”</p><p class="copy reward-copy">Parabéns, detetive. O Jane já sabia.<br>Agora vai tomar um chá.</p><a class="download-sticker" href="assets/patrick-jane.png" download="figurinha-patrick-jane.png">Guardar a figurinha ↓</a>`
 ];
 screen.innerHTML=pages[view];
 const archive=document.querySelector('#case-history');
 archive.hidden=stage===0;
 archive.innerHTML=stage>0?`<label for="history-stage">REGISTROS ANTERIORES</label><select id="history-stage"><option value="">Consultar uma etapa…</option>${['Recebimento do caso','Bilhete e laudo','Sala de arquivos','Folhas do caderno','Lacre final'].slice(0,stage).map((name,i)=>`<option value="${i}">${String(i+1).padStart(2,'0')} / ${name}</option>`).join('')}</select>${view<stage?'<button id="back-current" type="button">Voltar à etapa atual →</button>':''}`:'';
 document.querySelector('#history-stage')?.addEventListener('change',e=>{if(e.target.value!==''){view=Number(e.target.value);render(true)}});
 const resume=()=>{view=stage;render(true)};
 document.querySelector('#back-current')?.addEventListener('click',resume);
 document.querySelector('#resume')?.addEventListener('click',resume);
 document.querySelector('#answer-form')?.addEventListener('submit',e=>{e.preventDefault();const answer=normalize(document.querySelector('#answer').value);const expected=['AURORA','ABRAODOSSIE042','042','NORTE','NORTE2317'][stage];if(answer===expected){stage++;view=stage;storage.set(stage);render(true)}else{document.querySelector('#feedback').textContent='Resposta não reconhecida.';document.querySelector('#answer').select()}});
 if(focus){const title=document.querySelector('#screen-title');title.tabIndex=-1;title.focus()}
}
 document.querySelector('#reset').addEventListener('click',()=>{if(confirm('Recomeçar a investigação e apagar o progresso desta aba?')){stage=0;view=0;storage.set(stage);render(true)}});
 render();
